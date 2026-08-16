import React from 'react';
import { Zap, Cpu, HardDrive, ShieldCheck } from 'lucide-react';
import './WorkflowSection.css';

export const WorkflowSection: React.FC = () => {
  return (
    <section className="art-workflow-section section-with-bg">
      <div className="container relative-z">
        <div className="art-workflow-layout">
          {/* Left Column: Core Philosophy Statement */}
          <div className="art-workflow-statement">
            <span className="section-kicker">ENGINEERING PHILOSOPHY</span>
            <h2 className="art-workflow-title">
              <span className="workflow-title-line1">BUILT AROUND THE WORKFLOW.</span>
              <span className="workflow-title-line2">NOT AROUND THE BOX.</span>
            </h2>

            <div className="art-workflow-divider" />

            <p className="art-workflow-desc">
              VFX infrastructure cannot be bought off the shelf. We engineer systems around real artist playback, storage throughput, render node saturation, pipeline automation, and TPN security compliance.
            </p>
          </div>

          {/* Right Column: 4 Core Pipeline Pillars */}
          <div className="art-workflow-features">
            <div className="art-feature-item">
              <div className="art-feature-icon">
                <Zap size={22} />
              </div>
              <div>
                <h4>Zero-Latency Playback</h4>
                <p>Uncompressed 4K/8K EXR sequence streaming across artist workstations without dropped frames.</p>
              </div>
            </div>

            <div className="art-feature-item">
              <div className="art-feature-icon">
                <Cpu size={22} />
              </div>
              <div>
                <h4>Render Pool Saturation</h4>
                <p>Deadline-managed CPU/GPU bursting with dynamic licensing and automated queue prioritization.</p>
              </div>
            </div>

            <div className="art-feature-item">
              <div className="art-feature-icon">
                <HardDrive size={22} />
              </div>
              <div>
                <h4>Scale-Out ZFS & NVMe</h4>
                <p>High-IOPS caching pools preventing multi-user I/O lockup during heavy composite renders.</p>
              </div>
            </div>

            <div className="art-feature-item">
              <div className="art-feature-icon">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4>TPN / MPA Compliance</h4>
                <p>Perimeter firewalls, zero-trust network isolation, and air-gapped immutable backup vaults.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
