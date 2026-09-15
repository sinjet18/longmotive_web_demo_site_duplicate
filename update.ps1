$content = Get-Content -Path index.html -Raw
$content = $content -replace '(?s)aboutGallery: \[\s*\{vid:''uploads/chiller-jitter-loop.mp4'',cap:''Chilled-water plant room''\},\s*\{vid:''uploads/hf_20260725_022752_001f8e3c-c22b-48c3-86da-6acf846f63b5.mp4'',cap:''UPS & switchgear corridor''\},\s*\{vid:''uploads/hf_20260725_020706_310da804-c5e8-422a-8e01-c4d1b8bebcde.mp4'',cap:''Pipe prefabrication yard''\}\s*\]', "aboutGallery: [
          {vid:'uploads/chiller-jitter-loop.mp4',cap:'Chilled-water plant room',descWords:'Centralized cooling infrastructure engineered for maximum uptime.'.split(' ')},
          {vid:'uploads/hf_20260725_022752_001f8e3c-c22b-48c3-86da-6acf846f63b5.mp4',cap:'UPS & switchgear corridor',descWords:'Continuous power distribution with redundant backup systems.'.split(' ')},
          {vid:'uploads/hf_20260725_020706_310da804-c5e8-422a-8e01-c4d1b8bebcde.mp4',cap:'Pipe prefabrication yard',descWords:'Automated spool fabrication ensuring precision and quality control.'.split(' ')}
        ]"
$content = $content -replace '(?s)<sc-for list="\{\{ aboutGallery \}\}" as="g" hint-placeholder-count="3">.*?<\/sc-for>', '<sc-for list="{{ aboutGallery }}" as="g" hint-placeholder-count="3">
                <figure class="about-gallery-card" data-reveal="{{ $index }}">
                  <div class="about-gallery-media">
                    <sc-if value="{{ g.vid }}" hint-placeholder-val="{{ false }}"><video ref="{{ galleryVideoRef }}" data-src="{{ g.vid }}" autoPlay="{{ true }}" loop="{{ true }}" muted="{{ true }}" playsinline="{{ true }}" preload="auto"></video></sc-if>
                    <div class="about-gallery-overlay">
                      <p class="about-gallery-desc">
                        <sc-for list="{{ g.descWords }}" as="w" hint-placeholder-count="5">
                          <span style="transition-delay:calc({{ $index }} * 0.04s)">{{ w }}&nbsp;</span>
                        </sc-for>
                      </p>
                    </div>
                  </div>
                  <figcaption style="display:inline-flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--text-muted)"><span style="width:18px;height:2px;background:var(--color-accent)"></span>{{ g.cap }}</figcaption>
                </figure>
              </sc-for>'
Set-Content -Path index.html -Value $content -NoNewline
