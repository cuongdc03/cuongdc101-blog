---
title: "Containers Under the Hood: Linux Namespaces & cgroups"
description: "Demystifying what a container actually is by dissecting Linux kernel primitives: UTS, PID, NET, MNT namespaces, and control groups."
pubDate: "2026-09-02"
heroImage: "/images/docker-containers.jpg"
tags: ["docker", "linux", "devops", "containers"]
draft: false
---

Most developers use `docker run` daily, but how many know what a container actually is? 

Here is the secret: **containers are not virtual machines, and in Linux, there is no single system object called a 'container'.** A container is just a normal Linux process wrapped with isolation boundaries provided by **Namespaces** and resource caps enforced by **Control Groups (cgroups)**.

## The 6 Classic Namespaces

Namespaces determine **what a process can see**. When a process runs inside its own namespaces, it thinks it is the entire machine.

| Namespace | Isolates | What it controls |
| :--- | :--- | :--- |
| **PID** | Process IDs | The container sees its root process as PID 1 |
| **NET** | Network devices | Dedicated IP addresses, loopback, routing tables |
| **MNT** | Mount points | Isolated filesystem views (`chroot` on steroids) |
| **UTS** | Hostname | Container has its own distinct hostname |
| **IPC** | Inter-process comms | Shared memory segments, message queues |
| **USER** | User & Group IDs | Root inside container maps to unprivileged UID on host |

### Hands-on: Creating an Isolated Process with `unshare`

You can test namespace isolation directly on any Linux machine without Docker using the `unshare` command:

```bash
# Isolate PID, Mount, and UTS namespaces with a fresh shell
sudo unshare --fork --pid --mount-proc --uts /bin/bash

# Change hostname inside the isolated shell
hostname isolated-box

# Check hostname inside
hostname
# Output: isolated-box
```

If you open another terminal on the host, the host hostname remains completely untouched!

## What are Control Groups (cgroups)?

While namespaces define **what a process can see**, cgroups restrict **how much a process can use**.

Without cgroups, a buggy script with a memory leak in one container could easily take down the entire production host (`OOM killer`).

With cgroups v2, limits are organized hierarchically in `/sys/fs/cgroup`:

```bash
# Inspecting memory limit for a running Docker container
cat /sys/fs/cgroup/system.slice/docker-<container-id>.scope/memory.max
```

## Key Takeaway

Understanding that a container is merely a constrained process gives you super-powers when debugging:
- Debugging container networking is just debugging Linux network interfaces (`veth` pairs & `iptables`/`nftables`).
- Debugging resource exhaustion is just inspecting cgroup metrics.

In the next chapter, we will build on this by learning how to construct lean, production-grade container images with multi-stage builds.
