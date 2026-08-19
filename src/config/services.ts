export interface ServiceItem {
  id: string;
  iconName: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: 'vfx-infrastructure',
    iconName: 'Server',
    title: 'VFX Infrastructure',
    subtitle: 'Workstations & Physical Datacenter',
    description: 'Custom workstation specification, physical server deployment, virtualization clusters, and datacenter rack architecture engineered for high-load media pipelines.',
    capabilities: ['High-Performance Workstations', 'Virtualization Clusters', 'Rack & Power Density Design', 'Real-time System Monitoring'],
  },
  {
    id: 'high-performance-networks',
    iconName: 'Network',
    title: 'High-Performance Networks',
    subtitle: '10/25/40/100GbE Switching & Core',
    description: 'Ultra-low latency switching backbones designed to eliminate network bottlenecks during multi-user 4K/8K uncompressed video playback and render transfers.',
    capabilities: ['10/25/40/100GbE Switching', 'MLAG & LACP Trunking', 'VLAN & Traffic Segmentation', 'QoS & Bottleneck Diagnostics'],
  },
  {
    id: 'storage-data',
    iconName: 'HardDrive',
    title: 'Storage & Data Systems',
    subtitle: 'High-IOPS NVMe, ZFS & SAN/NAS',
    description: 'Tiered storage architectures combining lightning-fast NVMe caching with resilient ZFS scale-out pools for concurrent artist access and asset repositories.',
    capabilities: ['ZFS & NVMe Tiered Arrays', 'High-IOPS SAN / NAS Integration', 'Automated Snapshot Policies', 'Project Archiving & Replication'],
  },
  {
    id: 'render-pipeline',
    iconName: 'Cpu',
    title: 'Render & Pipeline',
    subtitle: 'Deadline, CPU/GPU Farms & Automation',
    description: 'Scalable CPU/GPU render farm integration managed via AWS Thinkbox Deadline, optimized for multi-engine render workloads and automated 3D/VFX production pipelines.',
    capabilities: ['AWS Thinkbox Deadline Integration', 'CPU & GPU Render Farm Tuning', 'Pool, Limit & License Control', 'Multi-Engine Orchestration & 3D/VFX Pipeline'],
  },
  {
    id: 'backup-disaster-recovery',
    iconName: 'Database',
    title: 'Backup & Disaster Recovery',
    subtitle: '3-2-1-1 Immutability & Business Continuity',
    description: 'Comprehensive data protection strategies including local immutable backups, off-site replication, LTO tape archives, and tested Disaster Recovery runbooks.',
    capabilities: ['3-2-1-1 Backup Strategy', 'Immutable Local & Cloud Storage', 'LTO Archive Integration', 'RPO / RTO Target & DR Runbooks'],
  },
  {
    id: 'cybersecurity-compliance',
    iconName: 'ShieldCheck',
    title: 'Cybersecurity & Compliance',
    subtitle: 'TPN & MPA Aligned Architecture',
    description: 'Hardened network perimeters, zero-trust access, MFA, endpoint protection, and security controls aligned with Motion Picture Association (MPA) and TPN guidelines.',
    capabilities: ['Next-Gen Firewalls & Microsegmentation', 'VPN / IPsec & ZTNA Access', 'TPN / MPA Security Alignment', 'SIEM & Hardening Audits'],
  },
];
