import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-fire-works',
  templateUrl: './fire-works.component.html',
  styleUrls: ['./fire-works.component.scss'],
})
export class FireWorksComponent {
  @ViewChild('birthdayCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private birthday!: Birthday;
  private animationFrameId!: number;
  private lastTimestamp!: number;

  constructor() {}

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.birthday = new Birthday(canvas, this.ctx);
    this.lastTimestamp = Date.now();
    this.startAnimation();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.birthday.resize();
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    this.birthday.onClick(event);
  }

  private startAnimation(): void {
    const loop = () => {
      const now = Date.now();
      const delta = (now - this.lastTimestamp) / 1000; // Convert to seconds
      this.lastTimestamp = now;
      this.birthday.update(delta);
      this.animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  }
}

// Helper functions
const PI2 = Math.PI * 2;
const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Birthday class
class Birthday {
  private fireworks: Firework[] = [];
  private counter: number = 0;
  private width!: number;
  private height!: number;

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D
  ) {
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  update(delta: number): void {
    this.ctx.clearRect(0, 0, this.width, this.height); // Clear canvas with transparency

    this.ctx.globalCompositeOperation = 'lighter';
    for (const firework of this.fireworks) {
      firework.update(delta);
    }

    this.counter += delta * 3;
    if (this.counter >= 1) {
      this.fireworks.push(
        new Firework(
          this.ctx,
          random(0, this.width),
          this.height,
          random(0, this.width),
          random(0, this.height),
          random(0, 360),
          random(30, 110)
        )
      );
      this.counter = 0;
    }

    this.fireworks = this.fireworks.filter((firework) => !firework.isDead());
  }

  onClick(event: MouseEvent): void {
    const x = event.clientX;
    const y = event.clientY;
    this.fireworks.push(
      new Firework(
        this.ctx,
        x,
        this.height,
        x,
        y,
        random(0, 360),
        random(30, 110)
      )
    );
  }
}

// Firework class
class Firework {
  private dead: boolean = false;
  private madeChilds: boolean = false;
  private history: { x: number; y: number }[] = [];
  private particles: Particle[] = [];

  constructor(
    private ctx: CanvasRenderingContext2D,
    private x: number,
    private y: number,
    private targetX: number,
    private targetY: number,
    private shade: number,
    private offsprings: number
  ) {}

  update(delta: number): void {
    if (this.dead) return;

    const xDiff = this.targetX - this.x;
    const yDiff = this.targetY - this.y;

    if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
      this.x += xDiff * 2 * delta;
      this.y += yDiff * 2 * delta;

      this.history.push({ x: this.x, y: this.y });
      if (this.history.length > 20) this.history.shift();
    } else {
      if (this.offsprings && !this.madeChilds) {
        const babies = this.offsprings / 2;
        for (let i = 0; i < babies; i++) {
          const angle = (PI2 * i) / babies;
          const targetX = this.x + this.offsprings * Math.cos(angle);
          const targetY = this.y + this.offsprings * Math.sin(angle);

          this.particles.push(
            new Particle(
              this.ctx,
              targetX,
              targetY,
              `hsl(${this.shade}, 100%, 50%)`
            )
          );
        }
      }
      this.madeChilds = true;
      this.history.shift();
    }

    if (this.history.length === 0) {
      this.dead = true;
    } else {
      for (let i = 0; i < this.history.length - 1; i++) {
        const start = this.history[i];
        const end = this.history[i + 1];

        const gradient = this.ctx.createLinearGradient(
          start.x,
          start.y,
          end.x,
          end.y
        );
        gradient.addColorStop(0, `hsla(${this.shade}, 100%, 50%, 0.8)`);
        gradient.addColorStop(1, `hsla(${this.shade}, 100%, 50%, 0)`);

        this.ctx.beginPath();
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
      }
    }

    // Update particles
    this.particles = this.particles.filter((particle) => particle.update());
  }

  isDead(): boolean {
    return this.dead;
  }
}

class Particle {
  private life: number;
  private x: number;
  private y: number;
  private speedX: number;
  private speedY: number;
  private radius: number;
  private color: string;

  constructor(
    private ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string
  ) {
    this.life = random(30, 60);
    this.x = x;
    this.y = y;
    this.speedX = random(-3, 3);
    this.speedY = random(-3, 3);
    this.radius = random(1, 3);
    this.color = color;
  }

  update(): boolean {
    this.x += this.speedX;
    this.y += this.speedY;
    this.radius *= 0.96; // Gradual size decrease
    this.life--;

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, PI2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();

    return this.life > 0;
  }
}
