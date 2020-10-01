# Cloud Resource (GCP) Orchestration

This is a suite to deploy Google Cloud Platform Compute Engine resource based on the number of users using a chat app.

This repository contains two folders:

API - a CRUD API for Google Cloud Platform: It creates, performs healthchecks, lists and deletes Compute Engine Instances in Google Cloud Platform.

theChat - a chat App that is able to work over multiple servers (VMs). It runs mostly on Nodejs, Express and Firebase. Users on different servers are able to interact in real time.
