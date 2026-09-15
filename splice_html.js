const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
let lines = html.split('\n'); // Note: it might be \r\n, so we should handle it

// Strip \r from lines to make it clean
lines = lines.map(l => l.replace('\r', ''));

const newContact = 
    <sc-if value="{{ isContact }}">
    <div style="background:var(--lm-projects-bg); color:var(--text-body)">
      <!-- 1. Hero Header -->
      <section style="padding:76px var(--gutter) 40px; border-bottom:1px solid rgba(255,255,255,0.05)">
        <div data-reveal="0" style="max-width:var(--container-max);margin:0 auto">
          <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:24px;margin-bottom:48px">
            <div>
              <span style="display:inline-flex;align-items:center;gap:9px;font-family:var(--font-display);font-weight:700;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--lm-cyan-400)"><span style="width:28px;height:2px;background:currentColor"></span>JOIN OUR TEAM</span>
              <h1 style="margin:16px 0 0;font-size:clamp(40px, 6vw, 64px);color:#fff;font-family:var(--font-display);font-weight:300;letter-spacing:-0.02em;line-height:1.1">BUILD YOUR <br/><span style="color:var(--color-accent)">FUTURE</span> WITH US</h1>
            </div>
            <div style="max-width:380px;text-align:right">
              <p style="margin:0;font-size:12px;color:var(--lm-blue-200);letter-spacing:0.04em;text-transform:uppercase;font-weight:500">HAVE QUESTIONS OR NEED ASSISTANCE WITH A PROJECT?<br/>Reach out to our team, we'll respond as soon as possible.</p>
              <a href="mailto:info@longmotive.com" style="display:inline-flex;align-items:center;gap:8px;font-size:11px;font-family:var(--font-mono);font-weight:600;letter-spacing:0.1em;color:var(--color-brand);text-transform:uppercase;text-decoration:none;margin-top:12px">CORPORATE SUPPORT LINE <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          
          <div style="text-align:center;padding:48px 24px;background:var(--surface-subtle);border:1px solid rgba(255,255,255,0.05);border-radius:var(--radius-lg);margin-bottom:24px">
            <h2 style="font-family:var(--font-display);font-size:24px;font-weight:300;color:#fff;letter-spacing:0.08em;margin:0 0 16px;line-height:1.4">WE'RE ALWAYS LOOKING FOR<br/>TALENTED AND COMMITTED<br/>PEOPLE TO JOIN OUR GROWING<br/>TEAM</h2>
            <p style="margin:0 auto;max-width:560px;font-size:13px;color:var(--lm-blue-200);line-height:1.6">Whatever your background or experience level, tell us where you'd like to contribute, attach your CV and contact details — or email: <a href="mailto:humanresource@longmotive.com" style="color:var(--lm-cyan-400);text-decoration:none;font-weight:500">humanresource@longmotive.com</a>.</p>
          </div>

          <div style="display:flex;justify-content:center;align-items:center;gap:12px;font-family:var(--font-mono);font-size:10px;font-weight:600;letter-spacing:0.15em;color:var(--lm-blue-300)">
            <span style="width:40px;height:1px;background:var(--color-brand)"></span>
            <span>ENGINEERING • CLEANROOMS • DATA CENTERS</span>
            <span style="width:40px;height:1px;background:var(--color-brand)"></span>
          </div>
        </div>
      </section>

      <!-- 2. Form Area -->
      <section style="padding:56px var(--gutter)">
        <div style="max-width:var(--container-max);margin:0 auto">
          <div class="lm-split2" style="display:grid;grid-template-columns:1fr 0.8fr;gap:40px">
            
            <!-- Left Form Area -->
            <div>
              <div role="tablist" aria-label="Contact form type" style="display:inline-flex;gap:12px;margin-bottom:32px">
                <button type="button" role="tab" aria-selected="{{ isEnquiryTab }}" disabled="{{ submitting }}" onClick="{{ showEnquiry }}" style="background:{{ isEnquiryTab ? 'var(--color-brand)' : 'transparent' }}; border:1px solid {{ isEnquiryTab ? 'var(--color-brand)' : 'var(--border-default)' }}; color:{{ isEnquiryTab ? '#fff' : 'var(--text-muted)' }}; border-radius:999px; padding:6px 20px; font-size:11px; font-family:var(--font-mono); font-weight:700; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; transition:all 0.2s ease">Enquiry</button>
                <button type="button" role="tab" aria-selected="{{ isCareersTab }}" disabled="{{ submitting }}" onClick="{{ showCareers }}" style="background:{{ isCareersTab ? 'var(--color-brand)' : 'transparent' }}; border:1px solid {{ isCareersTab ? 'var(--color-brand)' : 'var(--border-default)' }}; color:{{ isCareersTab ? '#fff' : 'var(--text-muted)' }}; border-radius:999px; padding:6px 20px; font-size:11px; font-family:var(--font-mono); font-weight:700; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; transition:all 0.2s ease">Careers</button>
              </div>

              <div style="margin-bottom:32px">
                <div style="font-family:var(--font-mono);font-size:10px;font-weight:700;letter-spacing:0.1em;color:var(--color-brand);text-transform:uppercase;margin-bottom:8px">FILL IN THE DETAILS BELOW, AND OUR TEAM WILL GET BACK TO YOU.</div>
                <h3 style="font-family:var(--font-display);font-size:28px;font-weight:300;color:#fff;letter-spacing:0.02em;margin:0">SEND US A MESSAGE</h3>
                <p style="margin:4px 0 0;font-size:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.04em">FEEL FREE TO INQUIRE ABOUT ANY SOLUTION YOU NEED.</p>
              </div>

              <sc-if value="{{ sent }}" hint-placeholder-val="{{ false }}">
                <div role="status" style="margin-bottom:20px;display:flex;gap:12px;padding:14px 16px;border-radius:var(--radius-md);background:rgba(23,201,100,0.1);border:1px solid rgba(23,201,100,0.3);color:#17c964"><span style="font-weight:700">{{ successTitle }}</span><span>{{ successMessage }}</span></div>
              </sc-if>
              <sc-if value="{{ err }}" hint-placeholder-val="{{ false }}">
                <div role="alert" style="margin-bottom:20px;display:flex;gap:12px;padding:14px 16px;border-radius:var(--radius-md);background:rgba(243,18,96,0.1);border:1px solid rgba(243,18,96,0.3);color:#f31260"><span style="font-weight:700">Unable to submit.</span><span>{{ errorMessage }}</span></div>
              </sc-if>

              <!-- Enquiry Form -->
              <sc-if value="{{ isEnquiryTab }}">
              <form onSubmit="{{ submitEnquiry }}" role="tabpanel" aria-label="Business enquiry form" style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
                <input type="hidden" name="formType" value="enquiry"/>
                <input type="text" name="website" value="{{ enquiry.website }}" onChange="{{ setEnquiryWebsite }}" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden"/>
                <div style="display:flex;flex-direction:column;gap:8px">
                  <label style="font-family:var(--font-mono);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--lm-blue-200)">Name <span style="color:var(--color-brand)">*</span></label>
                  <input name="name" value="{{ enquiry.name }}" onChange="{{ setEnquiryName }}" autocomplete="name" style="width:100%;padding:10px 0;border:none;border-bottom:1px solid rgba(255,255,255,0.2);background:transparent;color:#fff;font-family:var(--font-sans);font-size:14px;outline:none;transition:border-color 0.2s" onFocus="this.style.borderColor='var(--color-brand)'" onBlur="this.style.borderColor='rgba(255,255,255,0.2)'"/>
                </div>
                <div style="display:flex;flex-direction:column;gap:8px">
                  <label style="font-family:var(--font-mono);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--lm-blue-200)">Contact No. <span style="color:var(--color-brand)">*</span></label>
                  <input name="contact" value="{{ enquiry.contact }}" onChange="{{ setEnquiryContact }}" autocomplete="tel" style="width:100%;padding:10px 0;border:none;border-bottom:1px solid rgba(255,255,255,0.2);background:transparent;color:#fff;font-family:var(--font-sans);font-size:14px;outline:none;transition:border-color 0.2s" onFocus="this.style.borderColor='var(--color-brand)'" onBlur="this.style.borderColor='rgba(255,255,255,0.2)'"/>
                </div>
                <div style="grid-column:1 / -1;display:flex;flex-direction:column;gap:8px">
                  <label style="font-family:var(--font-mono);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--lm-blue-200)">Email Address <span style="color:var(--color-brand)">*</span></label>
                  <input type="email" name="email" value="{{ enquiry.email }}" onChange="{{ setEnquiryEmail }}" autocomplete="email" style="width:100%;padding:10px 0;border:none;border-bottom:1px solid rgba(255,255,255,0.2);background:transparent;color:#fff;font-family:var(--font-sans);font-size:14px;outline:none;transition:border-color 0.2s" onFocus="this.style.borderColor='var(--color-brand)'" onBlur="this.style.borderColor='rgba(255,255,255,0.2)'"/>
                </div>
                <div style="grid-column:1 / -1;display:flex;flex-direction:column;gap:8px">
                  <label style="font-family:var(--font-mono);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--lm-blue-200)">Subject <span style="color:var(--color-brand)">*</span></label>
                  <input name="subject" value="{{ enquiry.subject }}" onChange="{{ setEnquirySubject }}" style="width:100%;padding:10px 0;border:none;border-bottom:1px solid rgba(255,255,255,0.2);background:transparent;color:#fff;font-family:var(--font-sans);font-size:14px;outline:none;transition:border-color 0.2s" onFocus="this.style.borderColor='var(--color-brand)'" onBlur="this.style.borderColor='rgba(255,255,255,0.2)'"/>
                </div>
                <div style="grid-column:1 / -1;display:flex;flex-direction:column;gap:8px">
                  <label style="font-family:var(--font-mono);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--lm-blue-200)">Message <span style="color:var(--color-brand)">*</span></label>
                  <textarea rows="4" name="message" value="{{ enquiry.message }}" onChange="{{ setEnquiryMessage }}" style="width:100%;padding:10px 0;border:none;border-bottom:1px solid rgba(255,255,255,0.2);background:transparent;color:#fff;font-family:var(--font-sans);font-size:14px;outline:none;transition:border-color 0.2s;resize:vertical" onFocus="this.style.borderColor='var(--color-brand)'" onBlur="this.style.borderColor='rgba(255,255,255,0.2)'"></textarea>
                </div>
                <div style="grid-column:1 / -1;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;margin-top:16px">
                  <span style="font-size:10px;color:var(--text-muted);font-family:var(--font-sans)">THIS SITE IS PROTECTED BY RECAPTCHA AND THE GOOGLE<br/><a href="#" style="color:var(--text-muted)">PRIVACY POLICY</a> AND <a href="#" style="color:var(--text-muted)">TERMS OF SERVICE</a> APPLY.</span>
                  <button type="submit" disabled="{{ submitting }}" aria-busy="{{ submitting }}" style="display:inline-flex;align-items:center;gap:8px;font-family:var(--font-display);font-weight:700;letter-spacing:.06em;text-transform:uppercase;border:none;border-radius:2px;cursor:pointer;background:var(--color-brand);color:#fff;padding:12px 24px;font-size:12px;transition:background 0.2s" style-hover="background:var(--lm-blue-700)">{{ submitLabel }} ↗</button>
                </div>
              </form>
              </sc-if>

              <!-- Careers Form -->
              <sc-if value="{{ isCareersTab }}">
              <form onSubmit="{{ submitCareers }}" role="tabpanel" aria-label="Careers application form" style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
                <input type="hidden" name="formType" value="careers"/>
                <input type="text" name="website" value="{{ form.website }}" onChange="{{ setWebsite }}" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden"/>
                <div style="grid-column:1 / -1;display:flex;flex-direction:column;gap:8px">
                  <label style="font-family:var(--font-mono);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--lm-blue-200)">Salutation <span style="color:var(--color-brand)">*</span></label>
                  <select name="salutation" value="{{ form.salutation }}" onChange="{{ setSalutation }}" style="width:100%;padding:10px 0;border:none;border-bottom:1px solid rgba(255,255,255,0.2);background:transparent;color:#fff;font-family:var(--font-sans);font-size:14px;outline:none;appearance:none;border-radius:0">
                    <sc-for list="{{ salutations }}" as="o" hint-placeholder-count="5"><option value="{{ o }}" style="background:var(--lm-projects-bg);color:#fff">{{ o }}</option></sc-for>
                  </select>
                </div>
                <div style="display:flex;flex-direction:column;gap:8px">
                  <label style="font-family:var(--font-mono);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--lm-blue-200)">Name <span style="color:var(--color-brand)">*</span></label>
                  <input name="name" value="{{ form.name }}" onChange="{{ setName }}" style="width:100%;padding:10px 0;border:none;border-bottom:1px solid rgba(255,255,255,0.2);background:transparent;color:#fff;font-family:var(--font-sans);font-size:14px;outline:none;transition:border-color 0.2s" onFocus="this.style.borderColor='var(--color-brand)'" onBlur="this.style.borderColor='rgba(255,255,255,0.2)'"/>
                </div>
                <div style="display:flex;flex-direction:column;gap:8px">
                  <label style="font-family:var(--font-mono);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--lm-blue-200)">Contact No. <span style="color:var(--color-brand)">*</span></label>
                  <input name="contact" value="{{ form.contact }}" onChange="{{ setContact }}" style="width:100%;padding:10px 0;border:none;border-bottom:1px solid rgba(255,255,255,0.2);background:transparent;color:#fff;font-family:var(--font-sans);font-size:14px;outline:none;transition:border-color 0.2s" onFocus="this.style.borderColor='var(--color-brand)'" onBlur="this.style.borderColor='rgba(255,255,255,0.2)'"/>
                </div>
                <div style="grid-column:1 / -1;display:flex;flex-direction:column;gap:8px">
                  <label style="font-family:var(--font-mono);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--lm-blue-200)">Email Address <span style="color:var(--color-brand)">*</span></label>
                  <input type="email" name="email" value="{{ form.email }}" onChange="{{ setEmail }}" style="width:100%;padding:10px 0;border:none;border-bottom:1px solid rgba(255,255,255,0.2);background:transparent;color:#fff;font-family:var(--font-sans);font-size:14px;outline:none;transition:border-color 0.2s" onFocus="this.style.borderColor='var(--color-brand)'" onBlur="this.style.borderColor='rgba(255,255,255,0.2)'"/>
                </div>
                <div style="grid-column:1 / -1;display:flex;flex-direction:column;gap:8px">
                  <label style="font-family:var(--font-mono);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--lm-blue-200)">Position / Area of Interest <span style="color:var(--color-brand)">*</span></label>
                  <select name="jobTitle" value="{{ form.jobTitle }}" onChange="{{ setJobTitle }}" style="width:100%;padding:10px 0;border:none;border-bottom:1px solid rgba(255,255,255,0.2);background:transparent;color:#fff;font-family:var(--font-sans);font-size:14px;outline:none;appearance:none;border-radius:0">
                    <sc-for list="{{ jobTitles }}" as="o" hint-placeholder-count="12"><option value="{{ o }}" style="background:var(--lm-projects-bg);color:#fff">{{ o }}</option></sc-for>
                  </select>
                </div>
                <div style="grid-column:1 / -1;display:flex;flex-direction:column;gap:12px;margin-top:8px">
                  <label style="font-family:var(--font-mono);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--lm-blue-200)">Upload CV <span style="color:var(--color-brand)">*</span></label>
                  <label style="display:flex;align-items:center;gap:16px;cursor:pointer">
                    <span style="display:inline-flex;align-items:center;border:1px solid var(--color-brand);border-radius:999px;background:transparent;color:var(--color-brand);padding:6px 20px;font-size:11px;font-family:var(--font-mono);font-weight:700;letter-spacing:0.1em;text-transform:uppercase">Choose File</span>
                    <span style="font-size:12px;color:var(--text-muted);font-style:italic">{{ cvName }}</span>
                    <input type="file" name="cv" accept=".pdf,.doc,.docx" onChange="{{ setCv }}" style="display:none"/>
                  </label>
                </div>
                <div style="grid-column:1 / -1;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;margin-top:16px">
                  <span style="font-size:10px;color:var(--text-muted);font-family:var(--font-sans)">THIS SITE IS PROTECTED BY RECAPTCHA AND THE GOOGLE<br/><a href="#" style="color:var(--text-muted)">PRIVACY POLICY</a> AND <a href="#" style="color:var(--text-muted)">TERMS OF SERVICE</a> APPLY.</span>
                  <button type="submit" disabled="{{ submitting }}" aria-busy="{{ submitting }}" style="display:inline-flex;align-items:center;gap:8px;font-family:var(--font-display);font-weight:700;letter-spacing:.06em;text-transform:uppercase;border:none;border-radius:2px;cursor:pointer;background:var(--color-brand);color:#fff;padding:12px 24px;font-size:12px;transition:background 0.2s" style-hover="background:var(--lm-blue-700)">{{ submitLabel }} ↗</button>
                </div>
              </form>
              </sc-if>
            </div>

            <!-- Right Grid Area -->
            <div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.05)">
                <div style="background:var(--lm-projects-bg);min-height:220px;padding:32px;display:flex;flex-direction:column;justify-content:center"></div>
                <div style="background:var(--lm-projects-bg);min-height:220px;padding:32px;display:flex;flex-direction:column;justify-content:center">
                  <div style="font-size:8px;font-family:var(--font-mono);color:var(--lm-blue-300);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px">Open Position</div>
                  <div style="font-size:14px;font-family:var(--font-display);font-weight:300;color:#fff;line-height:1.4">CLEANROOM<br/>PROTOCOL</div>
                </div>
                <div style="background:var(--lm-projects-bg);min-height:220px;padding:32px;display:flex;flex-direction:column;justify-content:center;border-bottom:2px solid var(--color-brand)">
                  <div style="font-size:8px;font-family:var(--font-mono);color:var(--color-brand);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px">Capabilities</div>
                  <div style="font-size:14px;font-family:var(--font-display);font-weight:300;color:#fff;line-height:1.4">MECHANICAL<br/>(HVAC) &amp; M&amp;E<br/>ARCHITECTURE</div>
                </div>
                <div style="background:var(--lm-projects-bg);min-height:220px;padding:32px;display:flex;flex-direction:column;justify-content:center">
                  <div style="font-size:8px;font-family:var(--font-mono);color:var(--lm-blue-300);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px">Infrastructure</div>
                  <div style="font-size:14px;font-family:var(--font-display);font-weight:300;color:#fff;line-height:1.4">DATA CENTER<br/>FACILITY</div>
                </div>
              </div>
              <div style="display:flex;justify-content:space-between;margin-top:24px;font-family:var(--font-mono);font-size:9px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:var(--lm-blue-300)">
                <a href="#" style="color:inherit;text-decoration:none">EXPLORE ALL OPENINGS</a>
                <a href="mailto:humanresource@longmotive.com" style="color:var(--color-brand);text-decoration:none">SEND RESUME DIRECTLY ↗</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 3. Locate Business Office -->
      <section style="padding:56px var(--gutter);border-top:1px solid rgba(255,255,255,0.05)">
        <div style="max-width:var(--container-max);margin:0 auto">
          <div style="margin-bottom:32px">
            <span style="font-family:var(--font-mono);font-size:10px;font-weight:700;letter-spacing:0.1em;color:var(--color-brand);text-transform:uppercase;display:block;margin-bottom:8px">FIND OUR REGIONAL HEADQUARTERS IN JOHOR, MALAYSIA</span>
            <h2 style="font-family:var(--font-display);font-size:28px;font-weight:300;color:#fff;letter-spacing:0.04em;margin:0">LOCATE BUSINESS OFFICE</h2>
          </div>
          
          <div class="lm-split2" style="display:grid;grid-template-columns:320px 1fr;gap:24px">
            <!-- Left Contact Card -->
            <div>
              <div style="border:1px solid rgba(255,255,255,0.1);border-radius:2px;background:rgba(255,255,255,0.02);padding:24px">
                <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:12px;margin-bottom:24px">
                  <select style="background:transparent;border:none;color:#fff;font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;outline:none">
                    <option>JOHOR BAHRU, JOHOR</option>
                  </select>
                  <label style="display:flex;align-items:center;gap:6px;font-size:10px;color:var(--text-muted);cursor:pointer">
                    <input type="checkbox" style="accent-color:var(--color-brand)"/> Use current location
                  </label>
                </div>
                
                <div style="font-size:10px;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">CORPORATE OFFICE</div>
                <div style="font-size:14px;color:#fff;font-weight:600;margin-bottom:16px">Longmotive (M) Sdn. Bhd.</div>
                
                <div style="font-size:10px;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">ADDRESS</div>
                <div style="font-size:12px;color:var(--lm-blue-200);line-height:1.6;margin-bottom:16px">
                  No. 9, Jalan Teknologi Perintis 1/2,<br/>
                  Taman Teknologi Nusajaya,<br/>
                  79250 Iskandar Puteri, Johor.
                </div>
                
                <div style="font-size:10px;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">PHONE NUMBER</div>
                <div style="font-size:12px;color:var(--color-brand);margin-bottom:16px">+607-550 5651</div>
                
                <div style="font-size:10px;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">EMAIL</div>
                <div style="font-size:12px;color:var(--color-brand)">info@longmotive.com</div>
              </div>
            </div>

            <!-- Stylized CSS Map -->
            <a href="https://www.google.com/maps/search/?api=1&amp;query=No.%209%2C%20Jalan%20Teknologi%20Perintis%201%2F2%2C%20Taman%20Teknologi%20Nusajaya%2C%2079250%20Iskandar%20Puteri%2C%20Johor." target="_blank" rel="noopener noreferrer" style="display:block;position:relative;background:#09121c;border:1px solid rgba(255,255,255,0.05);border-radius:2px;overflow:hidden;min-height:320px;text-decoration:none">
              <!-- Grid lines -->
              <div style="position:absolute;top:0;left:0;right:0;bottom:0;background-image:linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);background-size:40px 40px"></div>
              <!-- Simulated map curve -->
              <svg width="100%" height="100%" style="position:absolute;top:0;left:0;stroke-width:1;stroke:rgba(255,255,255,0.1);fill:none"><path d="M0 200 Q 400 300 800 250 T 1600 200"/></svg>
              <!-- Pin -->
              <div style="position:absolute;top:55%;left:65%;width:12px;height:12px;background:transparent;border:2px solid var(--color-brand);border-radius:50%;transform:translate(-50%, -50%);display:flex;align-items:center;justify-content:center"><div style="width:4px;height:4px;background:var(--color-brand);border-radius:50%"></div></div>
              <!-- Popup -->
              <div style="position:absolute;top:55%;left:50%;transform:translate(-50%, -150%);background:rgba(0,0,0,0.8);border:1px solid rgba(255,255,255,0.1);padding:12px 16px;border-radius:4px;display:flex;align-items:flex-start;gap:12px;box-shadow:0 10px 30px rgba(0,0,0,0.5)">
                <div style="width:6px;height:6px;background:var(--color-brand);border-radius:50%;margin-top:6px"></div>
                <div>
                  <div style="font-size:12px;font-weight:600;color:#fff;margin-bottom:4px">Taman Teknologi Nusajaya</div>
                  <div style="font-size:10px;color:var(--text-muted)">Iskandar Puteri — Johor, Malaysia.</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- 4. Call or Email Us Directly -->
      <section style="padding:56px var(--gutter) 80px;border-top:1px solid rgba(255,255,255,0.05);text-align:center">
        <div style="max-width:var(--container-max);margin:0 auto">
          <span style="font-family:var(--font-mono);font-size:10px;font-weight:700;letter-spacing:0.1em;color:var(--color-brand);text-transform:uppercase;display:block;margin-bottom:8px">REACH OUT TO OUR TEAM FOR FAST, PERSONALIZED ASSISTANCE</span>
          <h2 style="font-family:var(--font-display);font-size:28px;font-weight:300;color:#fff;letter-spacing:0.04em;margin:0 0 48px">CALL OR EMAIL US DIRECTLY</h2>
          
          <div style="display:flex;justify-content:center;gap:64px;flex-wrap:wrap">
            <div style="display:flex;flex-direction:column;align-items:center;gap:12px">
              <div style="width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;color:var(--color-brand);margin-bottom:8px">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div style="font-family:var(--font-mono);font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#fff">PHONE SUPPORT</div>
              <div style="font-size:12px;color:var(--text-muted)">Mon - Fri, 9am - 6pm</div>
              <a href="tel:+6075505651" style="font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-brand);text-decoration:none;margin-top:8px">CALL US NOW ↗</a>
            </div>
            
            <div style="display:flex;flex-direction:column;align-items:center;gap:12px">
              <div style="width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;color:var(--color-brand);margin-bottom:8px">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
              </div>
              <div style="font-family:var(--font-mono);font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#fff">EMAIL SUPPORT</div>
              <div style="font-size:12px;color:var(--text-muted)">info@longmotive.com</div>
              <a href="mailto:info@longmotive.com" style="font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-brand);text-decoration:none;margin-top:8px">SEND AN EMAIL ↗</a>
            </div>
          </div>
        </div>
      </section>

    </div>
    </sc-if>
;

let part1 = lines.slice(0, 621).join('\n'); // 0 to 620 inclusive (ends with     </sc-if>)
let part2 = lines.slice(781, 831).join('\n'); // 781 is <sc-if value="{{ isProjects }}">, 830 is       </section>
// 831 in 1-based index is line 830 in 0-based array. Wait, my view_file was 1-based!
// view_file:
// 620:     </sc-if>
// 621: 
// So line array indices: 0 to 620 (length 621)
// 782:     <sc-if value="{{ isProjects }}">
// 831:       </section>
// So line array indices: 781 to 830 (length 50)
// 833:   <footer...
// So line array indices: 832 to end.

part1 = lines.slice(0, 621).join('\n');
part2 = lines.slice(781, 831).join('\n');
let part3 = lines.slice(832).join('\n');

let finalHtml = part1 + '\n\n' + part2 + '\n    </sc-if>\n\n' + newContact + '\n      </main>\n' + part3;

fs.writeFileSync('index.html', finalHtml, 'utf8');
