import React from 'react';

export default function AboutSection() {
  return (
    <section className="about-section glass-card">
      <div className="about-header text-center">
        <h2>DNS Propagation Checker</h2>
        <p className="subtitle">How to Check DNS Propagation Globally?</p>
      </div>
      
      <div className="about-intro">
        <p>Perform a quick DNS propagation lookup for any domain. Our DNS Propagation Test tool features a comprehensive list of 100+ global DNS servers, which makes global DNS checks more effortless than ever. It is designed to collect, parse, and display all the DNS propagation results on the map, going beyond text-based propagation reports.</p>
        <p>It visually represents how your DNS changes are propagated across different DNS servers in different regions globally. This enhances your understanding and makes identifying any regional variations or issues easier. Now monitor and manage your DNS records effectively.</p>
      </div>

      <div className="about-block">
        <h3><i className="fi fi-rr-magic-wand"></i> How to use our tool</h3>
        
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h4>Enter The Domain</h4>
            <p>Get started by providing the website domain name or hostname.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h4>Select DNS Record</h4>
            <p>Choose the DNS record type you want to verify from the drop-down menu.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h4>Perform Quick Check</h4>
            <p>Click “Search” to instantly run the global propagation check and view map results.</p>
          </div>
        </div>
      </div>

      <div className="about-block">
        <h3><i className="fi fi-rr-list"></i> Supported DNS Records</h3>
        <p className="block-desc">We support comprehensive propagation checks for all major DNS records:</p>
        <div className="records-grid">
          <div className="record-card">
            <div className="record-badge">A</div>
            <div className="record-content">
              <strong>A record</strong>
              <p>contains the IPv4 address info of the hostname.</p>
            </div>
          </div>
          <div className="record-card">
            <div className="record-badge" style={{ fontSize: '0.9rem' }}>AAAA</div>
            <div className="record-content">
              <strong>AAAA record</strong>
              <p>contains the IPv6 address info of the hostname.</p>
            </div>
          </div>
          <div className="record-card">
            <div className="record-badge" style={{ fontSize: '0.8rem' }}>CNAME</div>
            <div className="record-content">
              <strong>CNAME record</strong>
              <p>also known as alias record. It points the sub-domain to its domain, like pointing www.dnschecker.org to dnschecker.org. Get comprehensive insights about the domain’s CNAME records with <a href="#">CNAME record lookup</a>.</p>
            </div>
          </div>
          <div className="record-card">
            <div className="record-badge">MX</div>
            <div className="record-content">
              <strong>MX record</strong>
              <p>contains the info where the domain's email should be routed to and mail servers priority. <a href="#">Lookup MX record</a> for more info about the domain’s MX records.</p>
            </div>
          </div>
          <div className="record-card">
            <div className="record-badge">NS</div>
            <div className="record-content">
              <strong>NS record</strong>
              <p>contains information about the authoritative nameservers of a domain. <a href="#">NS Checker</a> will provide you with all the name servers associated with a domain.</p>
            </div>
          </div>
          <div className="record-card">
            <div className="record-badge">PTR</div>
            <div className="record-content">
              <strong>PTR record</strong>
              <p>used in <a href="#">reverse IP lookup</a> to map an IP address to a domain name, allowing the identification of the host associated with a particular IP address.</p>
            </div>
          </div>
          <div className="record-card">
            <div className="record-badge">SRV</div>
            <div className="record-content">
              <strong>SRV record</strong>
              <p>specifies the location and configuration of a particular service, such as email or voice over IP (VoIP), allowing clients to discover and connect to the appropriate server.</p>
            </div>
          </div>
          <div className="record-card">
            <div className="record-badge">SOA</div>
            <div className="record-content">
              <strong>SOA record</strong>
              <p>the start of authority is responsible for holding and specifying information about the DNS zone.</p>
            </div>
          </div>
          <div className="record-card">
            <div className="record-badge">TXT</div>
            <div className="record-content">
              <strong>TXT record</strong>
              <p>is commonly used for other DNS records configurations like <a href="#">SPF</a>, <a href="#">DKIM</a>, or <a href="#">DMARC records</a>.</p>
            </div>
          </div>
          <div className="record-card">
            <div className="record-badge">CAA</div>
            <div className="record-content">
              <strong>CAA record</strong>
              <p>used to assist in SSL validation by highlighting which authorities can issue certificates for a domain.</p>
            </div>
          </div>
          <div className="record-card">
            <div className="record-badge">DS</div>
            <div className="record-content">
              <strong>DS record</strong>
              <p>acts as a delegation signer, maintaining a chain of trust between the parent zone and child zone. Use the <a href="#">DS record Lookup</a> tool to dig deeper.</p>
            </div>
          </div>
          <div className="record-card">
            <div className="record-badge" style={{ fontSize: '0.75rem' }}>DNSKEY</div>
            <div className="record-content">
              <strong>DNSKEY record</strong>
              <p>contains the public signing keys like Zone Signing Key (ZSK) and Key Signing Key (KSK). Check the <a href="#">DNSKEY record</a> for more info.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-grid-2">
        <div className="about-block highlight-block">
          <h3><i className="fi fi-rr-info"></i> Understanding Results</h3>
          <ul className="custom-list">
            <li><i className="fi fi-sr-check-circle" style={{ color: 'var(--success)' }}></i> <span><strong>Propagated:</strong> The requested DNS record is available on the server and matches your expected value.</span></li>
            <li><i className="fi fi-sr-cross-circle" style={{ color: 'var(--error)' }}></i> <span><strong>Not Propagated:</strong> The record is unavailable or does not match the expected updated value.</span></li>
          </ul>
        </div>
        
        <div className="about-block info-block">
          <h3><i className="fi fi-rr-settings"></i> Advanced Controls</h3>
          <h4>Custom DNS Servers</h4>
          <p>Easily add your own custom servers using the "+" button. Specify the DNS Name, IP, Provider, and exact map coordinates.</p>
          <h4>Expected Values</h4>
          <p>Leverage smart controls to specify the expected value of a new IP address using regular expressions, containing numbers, or exact matches.</p>
        </div>
      </div>

      <div className="about-block" style={{ marginBottom: 0 }}>
        <h3><i className="fi fi-rr-search-alt"></i> Smart Search Capabilities</h3>
        <p style={{ color: 'var(--text-muted)' }}>In the "DNS Lists" section, click on any specific IP Address, Continent, or Country to instantly filter and validate propagation status for that specific region globally. For example, clicking on Asia will immediately verify whether the given hostname DNS has been propagated successfully across the entire Asian continent.</p>
      </div>
    </section>
  );
}
