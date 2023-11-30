provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "ec2_instance" {
  ami           = "ami-016485166ec7fa705"
  instance_type = "t4g.medium"
  key_name = ua-lab
  
  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo amazon-linux-extras install docker -y
              sudo service docker start
              sudo usermod -aG docker ec2-user
              EOF

  tags = {
    Name = "EC2-Instance"
  }
}

resource "aws_lb" "restaurant" {
  name               = "restaurant-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = ["sg-0f8bd8335c1b251b8"]
  subnets            = ["subnet-027880a4c78919765","subnet-0526d313d4125aa4b"]

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
