'use client';

import React, { useState } from 'react';

function FaqItem({ question, children, isOpen, onClick }: { question: string, children: React.ReactNode, isOpen: boolean, onClick: () => void }) {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <div className="faq-question" onClick={onClick}>
        <h4>{question}</h4>
        <div className="faq-icon">
          <i className="fi fi-rr-angle-down"></i>
        </div>
      </div>
      {isOpen && (
        <div className="faq-answer">
          {children}
        </div>
      )}
    </div>
  );
}

export default function AboutSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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

      <div className="about-block faq-section" style={{ marginTop: '5rem', marginBottom: '1rem' }}>
        <div className="about-header text-center" style={{ marginBottom: '3rem' }}>
          <h2>Frequently Asked Questions</h2>
          <p className="subtitle">Here’s the insider scope you need to know all about DNS!</p>
        </div>
        
        <div className="faq-grid">
          <FaqItem question="What is Domain Name System?" isOpen={openFaq === 0} onClick={() => toggleFaq(0)}>
            <p>Domain Name System (DNS) is a hierarchical decentralized system that maps domain names to IP addresses. It is the internet's equivalent of a phone book, mapping human-readable domain names to IP addresses.</p>
          </FaqItem>

          <FaqItem question="What is DNS resolution?" isOpen={openFaq === 1} onClick={() => toggleFaq(1)}>
            <p>DNS resolution translates the domain name into its server IP address. You need a <a href="#">site's IP address</a> to know where it’s on the Internet.</p>
            <p>The four DNS Servers work together (in a chain) to convert a domain name to its IP address, enabling the requested web resource to load on the user screen. Here is how the DNS resolution process works:</p>
            <ul>
              <li><strong>Recursive DNS server (DNS resolver):</strong> These servers are the first in the DNS check process. Receive DNS queries from clients and resolve the human-readable domain name to an IP address. That server tracks the IP address for the searched domain or hostname.</li>
              <li><strong>Root DNS servers:</strong> These servers are at the top of the DNS hierarchy and provide a list of top-level domain (TLD) servers to resolvers.</li>
              <li><strong>TLD Name Servers:</strong> These servers return the authoritative name servers for each domain. These are responsible for handling the requests for specific top-level domains like .com, org, etc. The .com TLD name servers will return results for abc.com but not abc.org.</li>
              <li><strong>Authoritative DNS servers:</strong> These servers are the last stop in the DNS resolution process. The authoritative nameservers for the searched domain hold the actual DNS records and respond to queries with the correct IP addresses.</li>
            </ul>
          </FaqItem>

          <FaqItem question="How does the DNS process work?" isOpen={openFaq === 2} onClick={() => toggleFaq(2)}>
            <p>Suppose you request to open the URL https://xyz.com in your web browser's bar. Here’s how it works:</p>
            <ol style={{ paddingLeft: '1.5rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
              <li>Your browser sends a DNS query to a DNS resolver (recursive Server), usually provided by your Internet Service Provider (ISP).</li>
              <li>The recursive resolver checks its cache to see if it already has the requested DNS information for the domain name. If it does, it returns to your computer, and the process ends.</li>
              <li>If the recursive resolver doesn't have the DNS information in its cache, it sends a query to the root DNS servers. These servers maintain a database of all the top-level domain names, such as .com, .org, .net, etc.</li>
              <li>The recursive resolver then contacts the root DNS servers that respond to the query with the IP of appropriate TLD (Top-Level Domain) DNS servers.</li>
              <li>The TLD DNS servers respond to the query by referring to the authoritative DNS servers for the domain name. These servers are responsible for maintaining the DNS records for the domain.</li>
              <li>The authoritative DNS servers respond to the query with the requested DNS records for the domain name.</li>
              <li>The DNS resolver caches the updated/latest fetched DNS records and returns them to your computer, which can now be used for whatever purpose those records were requested.</li>
            </ol>
          </FaqItem>

          <FaqItem question="What is DNS propagation?" isOpen={openFaq === 3} onClick={() => toggleFaq(3)}>
            <p>DNS propagation is the time DNS changes take to be updated across the internet over the globe. It can take up to 48 hours to propagate worldwide. Use our <a href="#">Global DNS Propagation Checker</a> for free to get a quick report on your DNS propagation status.</p>
          </FaqItem>

          <FaqItem question="How do DNS records propagate?" isOpen={openFaq === 4} onClick={() => toggleFaq(4)}>
            <p>When you update your DNS records, the changes may take up to 48 hours. During this period, ISPs worldwide update their DNS cache with new DNS information for your domain.</p>
            <p>However, DNS records may take some time to propagate due to different DNS cache levels. Thus, some visitors might be directed to the old server’s IP until the DNS propagation process finishes worldwide. However, most visitors see updated DNS records shortly after they change. You can look up A, AAAA, CNAME, and additional DNS records lookup from our <a href="#">DNS lookup</a> tool.</p>
          </FaqItem>

          <FaqItem question="Why DNS propagation takes time?" isOpen={openFaq === 5} onClick={() => toggleFaq(5)}>
            <p>Suppose you changed your domain's nameservers and requested to open your domain on the web browser. Your request will not go to the hosting directly. Each ISP node first checks its DNS cache, whether it has the DNS information for that domain. If it is not there, it will look it up by fetching DNS information from the authoritative DNS server of the domain to serve the user’s request. It also saves that info for future use to speed up the DNS lookup process. Thus, the new nameservers will not propagate instantly. ISPs have different cache refreshing levels resulting in some still having the old DNS information in their cache.</p>
          </FaqItem>

          <FaqItem question="Why is DNS not propagating?" isOpen={openFaq === 6} onClick={() => toggleFaq(6)}>
            <p>The ISPs across the world have different caching levels. The DNS client or the server may cache the information of the DNS records in its DNS cache. That information is temporarily cached, and DNS servers will go for the updated DNS information when TTL (Time to Live) expires.</p>
            <p><strong>Note:</strong> If your new DNS changes are still not reflecting, you can go for a <a href="#">DNS health check</a> to ensure that your DNS changes are up to the mark and following the standards. You can also <a href="#">flush your DNS cache</a>.</p>
          </FaqItem>

          <FaqItem question="What will happen if the domain name does not exist?" isOpen={openFaq === 7} onClick={() => toggleFaq(7)}>
            <p>The DNS server will return a name error, also known as an NXDomain response (for a non-existent domain), to symbolize that the query's domain name does not exist.</p>
          </FaqItem>

          <FaqItem question="What is the port used by DNS?" isOpen={openFaq === 8} onClick={() => toggleFaq(8)}>
            <p>DNS uses both TCP and UDP port 53. However, the most frequently used port for DNS is UDP 53. That is used when the client's computer communicates with the DNS server to resolve the domain name. When using the UDP 53 for DNS, the maximum size of the query packet is 512 bytes.</p>
            <p>TCP 53 is used primarily for Zone Transfers and when the query packet exceeds 512 bytes. That is true when DNSSEC is used, which adds extra overhead to the DNS query packet. You can test all the server ports using a <a href="#">port scanner online</a>.</p>
          </FaqItem>

          <FaqItem question="What is DNS failure?" isOpen={openFaq === 9} onClick={() => toggleFaq(9)}>
            <p>DNS failure means that the DNS server cannot convert the domain name into an IP address in a TCP/IP network. That failure may occur within the company's private network or the internet.</p>
          </FaqItem>

          <FaqItem question="Which are the best DNS servers?" isOpen={openFaq === 10} onClick={() => toggleFaq(10)}>
            <p>Some of the best <a href="#">Global DNS servers</a> are as follows:</p>
            <div className="best-servers-list">
              <div>
                <strong>Google Public DNS:</strong>
                <p>IPv4: Primary: 8.8.8.8, Secondary: 8.8.4.4</p>
                <p>IPv6: Primary: 2001:4860:4860::8888, Secondary: 2001:4860:4860::8844</p>
              </div>
              <div>
                <strong>OpenDNS:</strong>
                <p>IPv4: Primary: 208.67.222.222, Secondary: 208.67.220.220</p>
                <p>IPv6: Primary: 2620:119:35::35, Secondary: 2620:119:53::53</p>
              </div>
              <div>
                <strong>Quad9 (Malware Blocking Enabled):</strong>
                <p>IPv4: Primary: 9.9.9.9, Secondary: 149.112.112.112</p>
                <p>IPv6: Primary: 2620:fe::fe, Secondary: 2620:fe::9</p>
              </div>
              <div>
                <strong>DNS.Watch:</strong>
                <p>IPv4: Primary: 84.200.69.80, Secondary: 84.200.70.40</p>
                <p>IPv6: Primary: 2001:1608:10:25::1c04:b12f, Secondary: 2001:1608:10:25::9249:d69b</p>
              </div>
              <div>
                <strong>Comodo Secure DNS:</strong>
                <p>IPv4: Primary: 8.26.56.26, Secondary: 8.20.247.20</p>
              </div>
              <div>
                <strong>Cloudflare:</strong>
                <p>IPv4: Primary: 1.1.1.1, Secondary: 1.0.0.1</p>
                <p>IPv6: Primary: 2606:4700:4700::1111, Secondary: 2606:4700:4700::1001</p>
              </div>
            </div>
          </FaqItem>
        </div>
      </div>
    </section>
  );
}
