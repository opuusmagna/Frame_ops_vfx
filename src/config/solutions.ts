export interface SolutionItem {
  id: string;
  tag: string;
  title: string;
  summary: string;
  highlights: string[];
}

export const solutionsData: SolutionItem[] = [
  {
    id: 'new-vfx-studio',
    tag: 'TURNKEY DEPLOYMENT',
    title: 'New VFX Studio Setup',
    summary: 'Complete end-to-end infrastructure engineering for new studios. From core switching and storage arrays to render nodes, workstation templates, and perimeter security.',
    highlights: ['Zero-to-production blueprint', 'Scalable core network & storage', 'TPN-aligned security foundation'],
  },
  {
    id: 'infrastructure-upgrade',
    tag: 'OPTIMIZATION & RENEWAL',
    title: 'Infrastructure Upgrade',
    summary: 'Bottleneck audits and seamless migration paths for existing studios facing network congestion, slow frame loads, or outdated server hardware.',
    highlights: ['Non-disruptive migration path', '10/25/100GbE network refresh', 'Storage throughput acceleration'],
  },
  {
    id: 'render-expansion',
    tag: 'SCALABILITY',
    title: 'Render Farm Expansion',
    summary: 'Rapid scaling of CPU and GPU render capacity. Configured with Deadline repository limits, automatic power management, and software licensing optimization.',
    highlights: ['High-density CPU/GPU racks', 'Deadline repository & pool config', 'Dynamic hybrid cloud bursting'],
  },
  {
    id: 'storage-modernization',
    tag: 'DATA ACCELERATION',
    title: 'Storage Modernization',
    summary: 'Upgrade legacy NAS/SAN to ultra-fast NVMe tiering and ZFS scale-out storage. Guarantee steady frame rates for sequence playouts and heavy simulation caching.',
    highlights: ['NVMe read/write caching', 'ZFS pool integrity & snapshots', 'Multi-user concurrent playout'],
  },
  {
    id: 'security-compliance',
    tag: 'ASSET PROTECTION',
    title: 'Security & TPN Alignment',
    summary: 'Implementation of strict network segmentation, multi-factor authentication, perimeter firewalls, and audit logs aligned with studio security standards.',
    highlights: ['Isolated production VLANs', 'ZTNA & MFA remote access', 'Auditable compliance controls'],
  },
  {
    id: 'business-continuity',
    tag: 'DISASTER PREVENTION',
    title: 'Business Continuity & DR',
    summary: 'Protect studio IP against ransomware, hardware failures, or disaster. Automated immutable snapshots, offsite backups, and documented recovery procedures.',
    highlights: ['RPO & RTO SLA definitions', 'Air-gapped / immutable backups', 'Tested Disaster Recovery runbooks'],
  },
];
