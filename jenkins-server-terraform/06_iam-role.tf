resource "aws_iam_role" "iam-role" {
  name               = var.iam_role_name
  assume_role_policy = file("policies/ecs-role.json")
}