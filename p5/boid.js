class Boid {
  constructor(color, size, text) {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.accel = createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 4;
    this.color = color;
    this.size = size;
    this.text = text;
    this.emoji = int(random(1, 4));

    // this.mass = 1;
    // this.time = random(1500, 2000);
  }

  wrap() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  alignment(boids) {
    let perceptionRadius = 50;
    let total = 0;
    let steering = createVector();

    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      //IF OTHER BOID IS NOT THIS BOID AND DISTANCE IS LESS THAN A CERTAIN AMOUNT
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }

    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }
  cohesion(boids) {
    let perceptionRadius = 100;
    let total = 0;
    let steering = createVector();

    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      //IF OTHER BOID IS NOT THIS BOID AND DISTANCE IS LESS THAN A CERTAIN AMOUNT
      if (other != this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }

    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }
  seperation(boids) {
    let perceptionRadius = 100;
    let total = 0;
    let steering = createVector();

    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      //IF OTHER BOID IS NOT THIS BOID AND DISTANCE IS LESS THAN A CERTAIN AMOUNT
      if (other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d);
        steering.add(diff);
        total++;
      }
    }

    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  interactWithMouse(boids) {
    let perceptionRadius = 150;
    let total = 0;
    let steering = createVector();
    let x = mouseX;
    let y = mouseY;

    let d = dist(this.position.x, this.position.y, x, y);
    //IF OTHER BOID IS NOT THIS BOID AND DISTANCE IS LESS THAN A CERTAIN AMOUNT
    if (d < perceptionRadius) {
      let diff = p5.Vector.sub(this.position, createVector(x, y));
      diff.div(d);
      steering.add(diff);
      total++;
    }

    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  flock(boids) {
    let alignment = this.alignment(boids);
    let cohesion = this.cohesion(boids);
    let seperation = this.seperation(boids);
    let interact = this.interactWithMouse(boids);

    //  alignment.mult(alignmentSlider.value());
    //cohesion.mult(cohesionSlider.value());
    //seperation.mult(seperationSlider.value());

    this.accel.add(alignment);
    this.accel.add(cohesion);
    this.accel.add(seperation);
    this.accel.add(interact);

    //this.accel = alignment;
    //this.accel = cohesion;
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.accel);
    this.velocity.limit(this.maxSpeed);
    this.accel.mult(0);
  }

  display() {
    if (this.text) {
      strokeWeight(2);
      textSize(16);
      fill(this.color);
      if (this.emoji === 1) {
        text(': )', this.position.x, this.position.y);
      } else if (this.emoji === 2) {
        text(': o', this.position.x, this.position.y);
      } else if (this.emoji === 3) {
        text(': (', this.position.x, this.position.y);
      }
    } else if (!this.text) {
      strokeWeight(this.size);
      stroke(this.color);
      point(this.position.x, this.position.y);
    }
  }
}
