/* Freelance agreement shown in the Quick View window (fill, print or save as PDF). */
var CL = [['Scope of work', 'Only the work described in the written project description is included. Anything else is a change request, quoted and agreed in writing before work begins.'],
  ['Fees and payment', 'Total fee: {k3}. 50% deposit before any work starts (non-refundable, it reserves my time); the rest in milestones or on delivery. The final payment must be made in full before source files, admin access, hosting hand-over or launch. Payments must be traceable; work is not counted as paid until funds reach my account, and reversals or chargebacks after delivery are a breach. Invoices are due in 7 days; late amounts carry 2% per month, and I may pause work while any invoice is overdue.'],
  ['Client duties and timeline', 'The Client supplies content and decisions on time and gives feedback within 3 business days. Client delays move all dates. If the Client is silent for 14 days, I may pause the project and the next milestone becomes due.'],
  ['Revisions and acceptance', 'Each milestone includes two rounds of revisions within scope; more are billed hourly. A deliverable is accepted if no written, specific feedback arrives within 5 business days, or when it goes live.'],
  ['Ownership', 'I own all work until payment in full; after that the Client owns the custom code and designs made for the project. I keep my own tools, libraries and know-how, and may show the finished project in my portfolio without confidential data.'],
  ['Client content and compliance', 'The Client confirms it owns the rights to everything it supplies, and is responsible for legal, tax and data-protection compliance and for checking prices, taxes and totals before going live.'],
  ['Warranty and support', 'Defects in the agreed scope reported in writing within 30 days of acceptance are fixed free. Otherwise the software is provided as is. Backups, hosting, passwords and device security are the Client’s responsibility. Ongoing support needs a separate agreement.'],
  ['Liability', 'No liability for indirect or consequential loss; total liability is limited to the fees actually paid under this Agreement.'],
  ['Confidentiality', 'Each side keeps the other’s non-public business information confidential for 2 years after the Agreement ends.'],
  ['Termination', 'Either side may end this Agreement with 7 days’ written notice. The Client pays for all work done plus any milestone already started; the deposit stays non-refundable and unpaid work is not released.'],
  ['Independent contractor', 'I am an independent contractor, not an employee or partner. Messages and emails count as written notice. Changes must be in writing and confirmed by both sides.'],
  ['Disputes', 'Good-faith talks for 14 days first; then the competent courts of {k4}.']];
var CH = '<div class="ctr" data-lenis-prevent><h3>Freelance Services Agreement</h3><p class="mono">Software, web and business-system development · Mohamed EL-Zind · elziend@icloud.com · 01040123425</p>' +
  '<div class="cf2"><label>Client name / company<input id="k1" autocomplete="off"></label><label>Project name<input id="k2" autocomplete="off"></label><label>Total fee<input id="k3" placeholder="e.g. 20,000 EGP"></label><label>Courts / country<input id="k4" value="Egypt"></label></div>' +
  '<p>Between <b>Mohamed EL-Zind</b> (Developer) and <span class="b" data-b="k1">________</span> (Client) for the project <span class="b" data-b="k2">________</span>.</p><br><ol>' +
  CL.map(function (c) { return '<li><b>' + c[0] + '.</b> ' + c[1].replace(/\{(k\d)\}/g, '<span class="b" data-b="$1">________</span>') + '</li>'; }).join('') + '</ol>' +
  '<small>Template, not legal advice. Have a lawyer in your country review it before signing.</small>' +
  '<div class="act"><button class="g" id="k5">Print / Save as PDF</button><button id="k6">Accept on WhatsApp</button><button id="k7">Accept by email</button><a id="k8" download="Freelance-Agreement-Mohamed-EL-Zind.pdf">Full PDF template</a></div></div>';
function bindC() {
  var K = ['k1', 'k2', 'k3', 'k4'];
  function up() { K.forEach(function (k) { var v = $(k).value.trim() || '________'; document.querySelectorAll('#qm [data-b="' + k + '"]').forEach(function (x) { x.textContent = v; }); }); }
  K.forEach(function (k) { $(k).oninput = up; });
  up();
  function msg() { return 'Hello Mohamed, I am ' + ($('k1').value || 'a client') + '. I have read and accept the Freelance Services Agreement for "' + ($('k2').value || 'my project') + '" (total fee: ' + ($('k3').value || 'to be agreed') + '). Please send the deposit details.'; }
  $('k5').onclick = function () { window.print(); };
  $('k6').onclick = function () { window.open('https://wa.me/201040123425?text=' + encodeURIComponent(msg()), '_blank'); };
  $('k7').onclick = function () { location.href = 'mailto:elziend@icloud.com?subject=' + encodeURIComponent('Accepted: Freelance Services Agreement') + '&body=' + encodeURIComponent(msg()); };
  if (!window.CU) {
    try {
      var b = atob(PDF64), u = new Uint8Array(b.length);
      for (var i = 0; i < b.length; i++)
        u[i] = b.charCodeAt(i);
      window.CU = URL.createObjectURL(new Blob([u], { type: 'application/pdf' }));
    }
    catch (e) { }
  }
  if (window.CU)
    $('k8').href = window.CU;
  else
    $('k8').style.display = 'none';
}
$('cbtn').onclick = function () { openQ(this, { t: 'Freelance Services Agreement', html: CH }); bindC(); };
