provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "ec2_instance" {
  ami           = "ami-0fc5d935ebf8bc3bc"
  instance_type = "t3.medium"
  key_name      = "ua-lab"
  iam_instance_profile = "LabInstanceProfile"

  user_data = <<-EOF
    #!/bin/bash
    sudo apt-get update -y
    EOF

  tags = {
    Name = "EC2-Instance"
  }

  vpc_security_group_ids = [aws_security_group.ua-sg.id]
  subnet_id = "subnet-0b472e5e05cf26e76"
}

output "public_ip" {
  value = aws_instance.ec2_instance.public_ip
}

resource "aws_security_group" "ua-sg" {
  name        = "ua-sg"
  description = "Security group for EC2 instance"
  vpc_id = "vpc-084c64a9879223af3"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

}

#resource "aws_lb" "restaurant" {
#  name               = "restaurant-lb"
#  internal           = false
#  load_balancer_type = "application"
#  security_groups    = [aws_security_group.ua-sg.id]
#  subnets            = ["subnet-0b472e5e05cf26e76", "subnet-01203ee993f919c61"]

#  enable_deletion_protection = false
#}

#resource "aws_lb_target_group" "restaurant" {
# name     = "restaurant-tg"
#   port     = 3000
#   protocol = "HTTP"
#   vpc_id   = "vpc-084c64a9879223af3"

#   health_check {
#     path = "/"
#   }
# }

# resource "aws_lb_listener" "restaurant" {
#   load_balancer_arn = aws_lb.restaurant.arn
#   port              = 80
#   protocol          = "HTTP"

#   default_action {
#     type             = "forward"
#     target_group_arn = aws_lb_target_group.restaurant.arn
#   }
# }

# resource "aws_lb_listener_rule" "restaurant" {
#   listener_arn = aws_lb_listener.restaurant.arn

#   action {
#     type             = "forward"
#     target_group_arn = aws_lb_target_group.restaurant.arn
#   }

#   condition {
#     path_pattern {
#       values = ["/"]
#     }
#   }
# }
