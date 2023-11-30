provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "ec2_instance" {
  ami           = "ami-016485166ec7fa705"
  instance_type = "t4g.medium"
  key_name      = "ua-lab"
  
  user_data = <<-EOF
    #!/bin/bash
    sudo apt-get update -y
    EOF

  tags = {
    Name = "EC2-Instance"
  }

  vpc_security_group_ids = [aws_security_group.ec2_sg.id]
}

output "public_ip" {
  value = aws_instance.ec2_instance.public_ip
}

resource "aws_security_group" "ec2_sg" {
  name        = "ec2-sg"
  description = "Security group for EC2 instance"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

}

resource "aws_lb" "restaurant" {
  name               = "restaurant-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.ec2_sg.id]
  subnets            = ["subnet-027880a4c78919765", "subnet-0526d313d4125aa4b"]

  enable_deletion_protection = false
}

resource "aws_lb_target_group" "restaurant" {
  name     = "restaurant-tg"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = "vpc-07933dfe022917938"

  health_check {
    path = "/"
  }
}

resource "aws_lb_listener" "restaurant" {
  load_balancer_arn = aws_lb.restaurant.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.restaurant.arn
  }
}

resource "aws_lb_listener_rule" "restaurant" {
  listener_arn = aws_lb_listener.restaurant.arn

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.restaurant.arn
  }

  condition {
    path_pattern {
      values = ["/"]
    }
  }
}
