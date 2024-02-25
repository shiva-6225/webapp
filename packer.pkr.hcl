packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1"
    }
  }
}

variable "project_id" {
  type    = string
  default = ""
}

variable "gcp_region" {
  type    = string
  default = ""
}

variable "gcp_zone" {
  type    = string
  default = ""
}

variable "gcp_profile" {
  type    = string
  default = ""
}

variable "source_image" {
  type    = string
  default = ""
}

variable "ssh_username" {
  type    = string
  default = ""
}

variable "MYSQL_USERNAME" {
  type    = string
  default = "default"
}
variable "MYSQL_SERVER_URL" {
  type    = string
  default = "default"
}
variable "MYSQL_PASSWORD" {
  type    = string
  default = "default"
}
variable "MYSQL_DATABASE" {
  type    = string
  default = "default"
}
variable "MYSQL_PORT" {
  type    = string
  default = "default"
}
variable "project_path" {
  type    = string
  default = ""
}
variable "auth_file" {
  type    = string
  default = ""
}




source "googlecompute" "centos-image" {
  project_id         = "${var.project_id}"
  image_name         = "webapp-image"
  source_image       = "${var.source_image}"
  ssh_username       = "${var.ssh_username}"
  zone               = "${var.gcp_zone}"
  network_project_id = "default"
  credentials_file   = "${var.auth_file}"
}

build {
  sources = ["sources.googlecompute.centos-image"]
  provisioner "shell" {
    script = "./install-dependencies.sh"
  }

  provisioner "file" {
    source      = "${var.project_path}"
    destination = "/home/packer/webapp.zip"
  }

  provisioner "file" {
    source      = "csye6225.service"
    destination = "/tmp/csye6225.service"
  }

  provisioner "shell" {
    environment_vars = [
      "MYSQL_USERNAME=${var.MYSQL_USERNAME}",
      "MYSQL_PASSWORD=${var.MYSQL_PASSWORD}",
      "MYSQL_SERVER_URL=${var.MYSQL_SERVER_URL}",
      "MYSQL_DATABASE=${var.MYSQL_DATABASE}",
      "MYSQL_PORT=${var.MYSQL_PORT}"
    ]
    script = "./setupApp.sh"
  }
  provisioner "shell" {
    script = "./startService.sh"
  }
}
