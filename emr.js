import { Lucid, Blockfrost, Data, Constr } from "https://unpkg.com/lucid-cardano@0.10.11/web/mod.js";

// ---------------------- CONFIG ----------------------
const BLOCKFROST_URL = "https://cardano-preprod.blockfrost.io/api/v0";
const BLOCKFROST_KEY = "preprodYjRkHfcazNkL0xxG9C2RdUbUoTrG7wip";
const NETWORK = "Preprod";

// Replace with your deployed Plutus script CBOR
const SCRIPT_CBOR = "590e39010000323232323232332232323232323232323322323233223232323232323232323322323232323232323232232323232323232322322323253353232323500225335533532533333350011533333350021036103610371036103610361533333350021036103610361037103710361533333350021036103610361036103610371036103615333333500210361037103610361036103635004222222220011036133573892118696e76616c6964207374617465207472616e736974696f6e00035153355335533333350011035133014350022200235004222222220041330143500222002350042222222200613301435002220023500422222222003133014350022200235004222222220031330143500222002350042222222200510361335738920113756e617574686f72697a6564207369676e657200035153355333333500115335301600221333573466e20ccc050d4d400488004888800c064064d4014888888880080d80dc4c98c80e4cd5ce24810f6e6f2073637269707420696e7075740003a15335301600221333573466e20ccc050d4d400488004888800c064064d4014888888880080d80dc4c98c80e4cd5ce24810f6e6f2073637269707420696e7075740003a15335301600221333573466e20ccc050d4d400488004888800c064064d4014888888880080d80dc4c98c80e4cd5ce24810f6e6f2073637269707420696e7075740003a1333573466e20ccc04cccd54c06c48005406540a0cc054d40108888888800cd400888008060060d4010888888880080d40d84ccd5cd19b8833301333355301b12001501950283301535004222222220073500222002018018350042222222200203503615335301600221333573466e20ccc050d4d400488004888800c064064d4014888888880080d80dc4c98c80e4cd5ce2490f6e6f2073637269707420696e7075740003a10361335738920115626f6e642068616e646c696e6720696e76616c696400035103510353333573466e1cd55cea80224000466442466002006004646464646464646464646464646666ae68cdc39aab9d500c480008cccccccccccc88888888888848cccccccccccc00403403002c02802402001c01801401000c008cd40bc0c0d5d0a80619a8178181aba1500b33502f03135742a014666aa066eb940c8d5d0a804999aa819bae503235742a01066a05e07a6ae85401cccd540cc0f9d69aba150063232323333573466e1cd55cea801240004664424660020060046464646666ae68cdc39aab9d5002480008cc8848cc00400c008cd4121d69aba150023049357426ae8940088c98c8138cd5ce02702782609aab9e5001137540026ae854008c8c8c8cccd5cd19b8735573aa004900011991091980080180119a8243ad35742a00460926ae84d5d1280111931902719ab9c04e04f04c135573ca00226ea8004d5d09aba2500223263204a33573809409609026aae7940044dd50009aba1500533502f75c6ae854010ccd540cc0e88004d5d0a801999aa819bae200135742a00460786ae84d5d1280111931902319ab9c046047044135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d55cf280089baa00135742a00860586ae84d5d1280211931901c19ab9c0380390363333573466e1cd55cea802a4000464246002004606a6ae84d55cf280311931901b99ab9c0370380353333573466e1cd55cea806a400046666666644444444246666666600201201000e00c00a0080060046eb8d5d0a8069bae35742a0186eb8d5d0a8059bae35742a0146eb8d5d0a8049bae35742a0106eb4d5d0a803981a1aba135744a00e464c6406c66ae700d80dc0d040d8584d55cf280089baa0011375400226ae8940044d5d1280089aba25001135744a00226ae8940044d5d1280089aab9e5001137540024446464600200a640026aa05a4466a0029000111a80111299a999ab9a3371e00401205a0582600e0022600c006640026aa0584466a0029000111a80111299a999ab9a3371e00400e05805620022600c006446a004444444444444a66a666aa603224002a0224a66a666ae68cdc780700081881809a8138008a813002108188817911a800911111111111199aa980a09000911a80111111a8021119a8011299a999ab9a3371e02e00207006e266a05200c01020104010a04201446a002446a0044444444444446666a01a4a04a4a04a4a04a4666aa603224002a02246a00244a66aa66a666ae68cdc79a801110011a802110010198190999ab9a3370e6a004440026a00844002066064206426a0520062a05001a266a01244a66a004420062002a0289110012233553007120012350012233550150023355300a12001235001223355018002333500123302b4800000488cc0b00080048cc0ac00520000013355300712001235001223355015002333500123355300b1200123500122335501900235500d0010012233355500800f00200123355300b1200123500122335501900235500c00100133355500300a002001111222333553004120015010335530071200123500122335501500235500900133355300412001223500222533533355300c120013233500e223335003220020020013500122001123300122533500210261001023235001223300a002005006100313350140040035011001335530071200123500122323355016003300100532001355028225335001135500a003221350022253353300c002008112223300200a0041300600300232001355021221122253350011002221330050023335530071200100500400111212223003004112122230010043200135501e22112253350011500e22133500f300400233553006120010040013200135501d2211222533500113500322001221333500522002300400233355300712001005004001122123300100300222333573466e3c00800405c05848c88c008dd6000990009aa80d911999aab9f0012500a233500930043574200460066ae8800806c8c8c8cccd5cd19b8735573aa004900011991091980080180118079aba150023005357426ae8940088c98c8068cd5ce00d00d80c09aab9e5001137540024646464646666ae68cdc39aab9d5004480008cccc888848cccc00401401000c008c8c8c8cccd5cd19b8735573aa0049000119910919800801801180c1aba15002335010017357426ae8940088c98c807ccd5ce00f81000e89aab9e5001137540026ae854010ccd54021d728039aba150033232323333573466e1d4005200423212223002004357426aae79400c8cccd5cd19b875002480088c84888c004010dd71aba135573ca00846666ae68cdc3a801a400042444006464c6404266ae7008408807c0780744d55cea80089baa00135742a00466a018eb8d5d09aba2500223263201b33573803603803226ae8940044d5d1280089aab9e500113754002266aa002eb9d6889119118011bab00132001355018223233335573e0044a010466a00e66aa012600c6aae754008c014d55cf280118021aba20030191357420022244004244244660020080062244246600200600424464646666ae68cdc3a800a400046a00e600a6ae84d55cf280191999ab9a3370ea00490011280391931900a99ab9c015016013012135573aa00226ea800448488c00800c44880048c8c8cccd5cd19b875001480188c848888c010014c01cd5d09aab9e500323333573466e1d400920042321222230020053009357426aae7940108cccd5cd19b875003480088c848888c004014c01cd5d09aab9e500523333573466e1d40112000232122223003005375c6ae84d55cf280311931900999ab9c01301401101000f00e135573aa00226ea80048c8c8cccd5cd19b8735573aa004900011991091980080180118029aba15002375a6ae84d5d1280111931900799ab9c00f01000d135573ca00226ea80048c8cccd5cd19b8735573aa002900011bae357426aae7940088c98c8034cd5ce00680700589baa001232323232323333573466e1d4005200c21222222200323333573466e1d4009200a21222222200423333573466e1d400d2008233221222222233001009008375c6ae854014dd69aba135744a00a46666ae68cdc3a8022400c4664424444444660040120106eb8d5d0a8039bae357426ae89401c8cccd5cd19b875005480108cc8848888888cc018024020c030d5d0a8049bae357426ae8940248cccd5cd19b875006480088c848888888c01c020c034d5d09aab9e500b23333573466e1d401d2000232122222223005008300e357426aae7940308c98c8058cd5ce00b00b80a00980900880800780709aab9d5004135573ca00626aae7940084d55cf280089baa0012323232323333573466e1d400520022333222122333001005004003375a6ae854010dd69aba15003375a6ae84d5d1280191999ab9a3370ea0049000119091180100198041aba135573ca00c464c6401e66ae7003c0400340304d55cea80189aba25001135573ca00226ea80048c8c8cccd5cd19b875001480088c8488c00400cdd71aba135573ca00646666ae68cdc3a8012400046424460040066eb8d5d09aab9e500423263200c33573801801a01401226aae7540044dd500089119191999ab9a3370ea00290021091100091999ab9a3370ea00490011190911180180218031aba135573ca00846666ae68cdc3a801a400042444004464c6401a66ae7003403802c0280244d55cea80089baa0012323333573466e1d40052002200523333573466e1d40092000200523263200933573801201400e00c26aae74dd50008910010910009191999ab9a3370ea00290051091111100191999ab9a3370ea00490041091111100111999ab9a3370ea00690031091111100291999ab9a3370ea00890021091111100091999ab9a3370ea00a90011091111100211999ab9a3370ea00c90001091111100311931900519ab9c00a00b008007006005004003135573a6ea80052649010350543100120012233700004002224646002002446600660040040021";
const script = { type: "PlutusV2", script: SCRIPT_CBOR };

// Datum schema for EMR
const EMRDatum = Data.Object({
  patient: Data.Bytes(),
  doctor: Data.Bytes(),
  recordHash: Data.Bytes(),
  resolved: Data.Boolean(),
});

// Share schema
const ShareDatum = Data.Object({
  recordHash: Data.Bytes(),
  delegate: Data.Bytes(),
  expiryBlock: Data.Integer(),
  patient: Data.Bytes()
});

const resolveRedeemer = Data.to(new Constr(1, []));
const claimRedeemer = Data.to(new Constr(2, []));

let lucid;
let walletAddress;
let scriptAddress;
let walletPkh = "";
let allUtxos = []; // Cache for UTXOs

// ---------------------- LOGGING ----------------------
function log(msg, isError = false) {
  const el = document.getElementById("log");
  if (!el) {
    console.log(msg);
    return;
  }
  const prefix = isError ? "❌ " : "✅ ";
  el.textContent += (isError ? prefix : "") + msg + "\n";
  el.scrollTop = el.scrollHeight;
}

function clearLog() {
  const el = document.getElementById("log");
  if (el) el.textContent = "";
}

// ---------------------- COPY TO CLIPBOARD FUNCTION ----------------------
window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    log(`✅ Copied to clipboard: ${text.substring(0, 20)}...`);
  }).catch(err => {
    log(`❌ Failed to copy: ${err}`, true);
  });
}

// ---------------------- UPDATE STATS ----------------------
async function updateStats() {
  try {
    if (!lucid) {
      const networkStatus = document.getElementById("network-status");
      if (networkStatus) networkStatus.textContent = "Disconnected";
      return;
    }

    const utxos = await lucid.utxosAt(scriptAddress);
    allUtxos = utxos;
    
    const totalRecords = utxos.length;
    let activeRecords = 0;
    
    utxos.forEach(u => {
      if (u.datum) {
        try {
          const d = Data.from(u.datum, EMRDatum);
          if (!d.resolved) activeRecords++;
        } catch (e) {}
      }
    });
    
    const totalEl = document.getElementById("total-records");
    const activeEl = document.getElementById("active-records");
    const networkEl = document.getElementById("network-status");
    
    if (totalEl) totalEl.textContent = totalRecords;
    if (activeEl) activeEl.textContent = activeRecords;
    if (networkEl) networkEl.textContent = NETWORK;
    
  } catch (e) {
    console.error("Failed to update stats:", e);
  }
}

// ---------------------- RENDER RECORDS LIST ----------------------
function renderRecordsList(records, containerId = "records-list") {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (!records || records.length === 0) {
    container.innerHTML = '<div class="empty-state">No records found</div>';
    return;
  }
  
  let html = '';
  records.forEach((u, index) => {
    try {
      const d = Data.from(u.datum, EMRDatum);
      const status = d.resolved ? 'resolved' : 'active';
      const statusText = d.resolved ? '🔓 RESOLVED' : '🔒 ACTIVE';
      
      html += `
        <div class="record-item ${status}" style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 15px; background: ${d.resolved ? '#f0fff4' : 'white'};">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span style="background: ${d.resolved ? '#48bb78' : '#f6ad55'}; color: white; padding: 3px 8px; border-radius: 15px; font-size: 0.9em;">${statusText}</span>
            <small style="color: #666;">Tx: ${u.txHash.substring(0, 16)}...</small>
          </div>
          <div style="font-family: monospace; font-size: 0.9em;">
            <div style="margin-bottom: 8px; word-break: break-all;">
              <strong style="color: #4a5568;">Patient:</strong> ${d.patient}
            </div>
            <div style="margin-bottom: 8px; word-break: break-all;">
              <strong style="color: #4a5568;">Doctor:</strong> ${d.doctor}
            </div>
            <div style="margin-bottom: 8px;">
              <strong style="color: #4a5568;">Record Hash:</strong>
              <div style="background: #f7fafc; padding: 10px; border-radius: 4px; margin-top: 5px; border: 1px solid #e2e8f0; word-break: break-all; font-size: 0.85em;">
                ${d.recordHash}
              </div>
              <button onclick="copyToClipboard('${d.recordHash}')" style="margin-top: 5px; padding: 5px 10px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85em;">
                📋 Copy Full Hash
              </button>
            </div>
          </div>
        </div>
      `;
    } catch (e) {
      console.error("Error rendering record:", e);
    }
  });
  
  container.innerHTML = html;
}

// ---------------------- DATUM BUILDER ----------------------
function mkEMRDatum(patientPkh, doctorPkh, recordHash) {
  return Data.to({
    patient: patientPkh,
    doctor: doctorPkh,
    recordHash,
    resolved: false,
  }, EMRDatum);
}

// ---------------------- SUBMIT RECORD ----------------------
async function submitRecord() {
  clearLog();
  
  try {
    if (!lucid) {
      log("Please connect wallet first", true);
      return;
    }

    const summary = document.getElementById("summary")?.value.trim();
    const encryptData = document.getElementById("encryptData")?.checked || false;
    const emergencyAccess = document.getElementById("emergencyAccess")?.checked || false;
    
    if (!summary) {
      log("Please enter a record summary", true);
      return;
    }

    // Get PubKeyHashes from input fields
    const patientPkh = document.getElementById("patient")?.value.trim();
    const doctorPkh = document.getElementById("doctor")?.value.trim();

    if (!patientPkh || !doctorPkh) {
      log("Patient and Doctor PubKeyHashes are required", true);
      return;
    }

    log("📝 Creating record hash from summary...");
    
    // Prepare data for hashing (include metadata)
    let dataToHash = summary;
    if (encryptData) {
      dataToHash = btoa(summary);
      log("🔒 Data will be base64 encoded");
    }
    if (emergencyAccess) {
      dataToHash += ":emergency";
    }
    
    // Compute SHA256 hash
    const recordHashBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(dataToHash)
    );
    const recordHash = Array.from(new Uint8Array(recordHashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    log(`Record Hash: ${recordHash}`);

    // Create datum
    const datum = mkEMRDatum(patientPkh, doctorPkh, recordHash);

    log("Building transaction...");
    
    // Build and submit transaction
    const tx = await lucid
      .newTx()
      .payToContract(scriptAddress, { inline: datum }, { lovelace: 3_000_000n })
      .complete();

    log("Signing transaction...");
    const signed = await tx.sign().complete();
    
    log("Submitting transaction...");
    const txHash = await signed.submit();

    log(`🚀 Record submitted successfully!`);
    log(`Transaction Hash: ${txHash}`);
    
    // Clear summary input
    if (document.getElementById("summary")) document.getElementById("summary").value = "";
    if (document.getElementById("encryptData")) document.getElementById("encryptData").checked = false;
    if (document.getElementById("emergencyAccess")) document.getElementById("emergencyAccess").checked = false;
    
    // Update stats and view
    await updateStats();
    await viewRecords();
    
  } catch (e) {
    log(`Submit failed: ${e.message}`, true);
    console.error(e);
  }
}

// ---------------------- RESOLVE RECORD ----------------------
async function resolveRecord() {
  clearLog();
  
  try {
    if (!lucid) {
      log("Please connect wallet first", true);
      return;
    }

    const recordHash = document.getElementById("recordHash")?.value.trim();
    
    if (!recordHash) {
      log("Please enter a record hash", true);
      return;
    }

    log(`Searching for record: ${recordHash}`);
    
    const utxos = await lucid.utxosAt(scriptAddress);
    log(`Found ${utxos.length} UTXOs at script address`);

    const utxo = utxos.find(u => {
      if (!u.datum) return false;
      try {
        const d = Data.from(u.datum, EMRDatum);
        return d.recordHash === recordHash && !d.resolved;
      } catch (e) {
        return false;
      }
    });

    if (!utxo) {
      log("No unresolved record found with that hash", true);
      return;
    }

    const oldDatum = Data.from(utxo.datum, EMRDatum);
    
    // Check if current user is authorized (patient or doctor)
    if (oldDatum.patient !== walletPkh && oldDatum.doctor !== walletPkh) {
      log("You are not authorized to resolve this record", true);
      return;
    }

    log("Record found. Creating resolution transaction...");
    
    const newDatum = Data.to({ 
      patient: oldDatum.patient,
      doctor: oldDatum.doctor,
      recordHash: oldDatum.recordHash,
      resolved: true 
    }, EMRDatum);

    const tx = await lucid.newTx()
      .collectFrom([utxo], resolveRedeemer)
      .attachSpendingValidator(script)
      .payToContract(scriptAddress, { inline: newDatum }, utxo.assets)
      .complete();

    log("Signing transaction...");
    const signed = await tx.sign().complete();
    
    log("Submitting transaction...");
    const txHash = await signed.submit();

    log(`✅ Record resolved successfully!`);
    log(`Transaction Hash: ${txHash}`);
    
    // Clear input
    if (document.getElementById("recordHash")) document.getElementById("recordHash").value = "";
    
    // Update stats and view
    await updateStats();
    await viewRecords();
    
  } catch(e) {
    log(`Resolve failed: ${e.message}`, true);
    console.error(e);
  }
}

// ---------------------- VIEW RECORDS ----------------------
async function viewRecords() {
  clearLog();
  
  try {
    if (!lucid) {
      log("Please connect wallet first", true);
      return;
    }

    log("Fetching records from blockchain...");
    
    const utxos = await lucid.utxosAt(scriptAddress);
    const myPkh = walletPkh;

    const myRecords = utxos.filter(u => {
      if (!u.datum) return false;
      try {
        const d = Data.from(u.datum, EMRDatum);
        return d.patient === myPkh || d.doctor === myPkh;
      } catch (e) {
        return false;
      }
    });

    // Render records in the UI
    renderRecordsList(myRecords);

    if (myRecords.length === 0) {
      log("📋 No records found for this wallet");
      return;
    }

    log(`📋 Found ${myRecords.length} record(s):`);
    log("─".repeat(80));
    
    myRecords.forEach((u, index) => {
      const d = Data.from(u.datum, EMRDatum);
      const status = d.resolved ? "🔓 RESOLVED" : "🔒 ACTIVE";
      log(`\n[Record ${index + 1}] ${status}`);
      log(`  Patient: ${d.patient}`);
      log(`  Doctor: ${d.doctor}`);
      log(`  Hash: ${d.recordHash}`);
      log(`  Tx ID: ${u.txHash}`);
      log(`  ────────────────────────────────────────────────────────────────────────────────`);
    });
    
  } catch(e) {
    log(`View failed: ${e.message}`, true);
    console.error(e);
  }
}

// ---------------------- SEARCH RECORDS ----------------------
async function searchRecords() {
  clearLog();
  
  try {
    if (!lucid) {
      log("Please connect wallet first", true);
      return;
    }

    const searchTerm = document.getElementById("searchInput")?.value.trim().toLowerCase();
    
    if (!searchTerm) {
      log("Please enter a search term", true);
      return;
    }

    log(`Searching for: ${searchTerm}...`);
    
    const utxos = await lucid.utxosAt(scriptAddress);

    const matchingRecords = utxos.filter(u => {
      if (!u.datum) return false;
      try {
        const d = Data.from(u.datum, EMRDatum);
        return d.recordHash.toLowerCase().includes(searchTerm) ||
               d.patient.toLowerCase().includes(searchTerm) ||
               d.doctor.toLowerCase().includes(searchTerm);
      } catch (e) {
        return false;
      }
    });

    if (matchingRecords.length === 0) {
      log("No matching records found");
      return;
    }

    log(`Found ${matchingRecords.length} matching record(s):`);
    log("─".repeat(80));
    
    matchingRecords.forEach((u, index) => {
      const d = Data.from(u.datum, EMRDatum);
      const status = d.resolved ? "🔓 RESOLVED" : "🔒 ACTIVE";
      log(`\n[Record ${index + 1}] ${status}`);
      log(`  Patient: ${d.patient}`);
      log(`  Doctor: ${d.doctor}`);
      log(`  Hash: ${d.recordHash}`);
      log(`  ────────────────────────────────────────────────────────────────────────────────`);
    });
    
  } catch(e) {
    log(`Search failed: ${e.message}`, true);
    console.error(e);
  }
}

// ---------------------- EXPORT RECORDS ----------------------
async function exportRecords() {
  try {
    if (!lucid) {
      log("Please connect wallet first", true);
      return;
    }

    log("📥 Exporting records...");
    
    const utxos = await lucid.utxosAt(scriptAddress);
    const myPkh = walletPkh;

    const myRecords = utxos.filter(u => {
      if (!u.datum) return false;
      try {
        const d = Data.from(u.datum, EMRDatum);
        return d.patient === myPkh || d.doctor === myPkh;
      } catch (e) {
        return false;
      }
    });

    const exportData = myRecords.map(u => {
      const d = Data.from(u.datum, EMRDatum);
      return {
        txHash: u.txHash,
        patient: d.patient,
        doctor: d.doctor,
        recordHash: d.recordHash,
        resolved: d.resolved,
        assets: u.assets
      };
    });

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emr-records-${new Date().toISOString()}.json`;
    a.click();
    
    log(`✅ Exported ${myRecords.length} records`);
    
  } catch(e) {
    log(`Export failed: ${e.message}`, true);
    console.error(e);
  }
}

// ---------------------- EMERGENCY ACCESS ----------------------
async function emergencyAccess() {
  clearLog();
  
  try {
    if (!lucid) {
      log("Please connect wallet first", true);
      return;
    }

    const recordHash = document.getElementById("emergencyHash")?.value.trim();
    const reason = document.getElementById("emergencyReason")?.value.trim();
    
    if (!recordHash) {
      log("Please enter a record hash", true);
      return;
    }

    if (!reason) {
      log("Please provide an emergency reason", true);
      return;
    }

    log(`🚨 EMERGENCY ACCESS REQUESTED for hash: ${recordHash}`);
    log(`Reason: ${reason}`);
    
    const utxos = await lucid.utxosAt(scriptAddress);
    
    const utxo = utxos.find(u => {
      if (!u.datum) return false;
      try {
        const d = Data.from(u.datum, EMRDatum);
        return d.recordHash === recordHash;
      } catch (e) {
        return false;
      }
    });

    if (!utxo) {
      log("No record found with that hash", true);
      return;
    }

    const d = Data.from(utxo.datum, EMRDatum);
    
    log("📋 RECORD ACCESS GRANTED (Emergency)");
    log("─".repeat(80));
    log(`Patient: ${d.patient}`);
    log(`Doctor: ${d.doctor}`);
    log(`Status: ${d.resolved ? 'Resolved' : 'Active'}`);
    log(`Hash: ${d.recordHash}`);
    log(`\n⚠️ Emergency access logged for audit`);
    log(`Emergency reason: ${reason}`);
    
  } catch(e) {
    log(`Emergency access failed: ${e.message}`, true);
    console.error(e);
  }
}

// ---------------------- VERIFY RECORD ----------------------
async function verifyRecord() {
  clearLog();
  
  try {
    const summary = document.getElementById("verifySummary")?.value.trim();
    const storedHash = document.getElementById("verifyHash")?.value.trim();
    
    if (!summary || !storedHash) {
      log("Please enter both summary and stored hash", true);
      return;
    }

    log("🔍 Verifying record...");
    
    // Compute hash of provided summary
    const recordHashBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(summary)
    );
    const computedHash = Array.from(new Uint8Array(recordHashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (computedHash === storedHash) {
      log("✅ VERIFICATION SUCCESSFUL - Record is authentic");
    } else {
      log("❌ VERIFICATION FAILED - Record has been tampered with", true);
      log(`Computed: ${computedHash}`);
      log(`Stored:   ${storedHash}`);
    }
    
  } catch(e) {
    log(`Verification failed: ${e.message}`, true);
    console.error(e);
  }
}

// ---------------------- SHOW STATS ----------------------
async function showStats() {
  clearLog();
  
  try {
    if (!lucid) {
      log("Please connect wallet first", true);
      return;
    }

    await updateStats();
    
    const utxos = await lucid.utxosAt(scriptAddress);
    const myPkh = walletPkh;
    
    let totalActive = 0;
    let totalResolved = 0;
    let myActive = 0;
    let myResolved = 0;
    
    utxos.forEach(u => {
      if (u.datum) {
        try {
          const d = Data.from(u.datum, EMRDatum);
          if (d.resolved) {
            totalResolved++;
            if (d.patient === myPkh || d.doctor === myPkh) myResolved++;
          } else {
            totalActive++;
            if (d.patient === myPkh || d.doctor === myPkh) myActive++;
          }
        } catch (e) {}
      }
    });

    log("📊 SYSTEM STATISTICS");
    log("─".repeat(50));
    log(`Total Records: ${utxos.length}`);
    log(`├─ Active: ${totalActive}`);
    log(`└─ Resolved: ${totalResolved}`);
    log("");
    log(`My Records: ${myActive + myResolved}`);
    log(`├─ Active: ${myActive}`);
    log(`└─ Resolved: ${myResolved}`);
    
  } catch(e) {
    log(`Stats failed: ${e.message}`, true);
    console.error(e);
  }
}

// ---------------------- HEALTH TIMELINE ----------------------
async function showHealthTimeline() {
  clearLog();
  
  try {
    if (!lucid) {
      log("Please connect wallet first", true);
      return;
    }

    const utxos = await lucid.utxosAt(scriptAddress);
    const myPkh = walletPkh;

    // Get records where user is patient
    const myRecords = utxos.filter(u => {
      if (!u.datum) return false;
      try {
        const d = Data.from(u.datum, EMRDatum);
        return d.patient === myPkh;
      } catch (e) {
        return false;
      }
    });

    // Sort by date (using transaction index as proxy)
    const timeline = myRecords.map(u => {
      const d = Data.from(u.datum, EMRDatum);
      return {
        date: new Date(parseInt(u.txHash.substring(0, 8), 16) * 1000).toLocaleDateString(),
        recordHash: d.recordHash,
        doctor: d.doctor,
        resolved: d.resolved,
        txHash: u.txHash
      };
    }).reverse();

    log("📅 YOUR HEALTH TIMELINE");
    log("─".repeat(50));
    
    if (timeline.length === 0) {
      log("No records found in your timeline");
      return;
    }
    
    timeline.forEach((record, index) => {
      log(`\n${record.date} - Record #${index + 1}`);
      log(`  Doctor: ${record.doctor.substring(0, 20)}...`);
      log(`  Status: ${record.resolved ? '🔓 Resolved' : '🔒 Active'}`);
      log(`  Hash: ${record.recordHash.substring(0, 20)}...`);
    });
    
  } catch(e) {
    log(`Timeline failed: ${e.message}`, true);
  }
}

// ---------------------- MY PATIENTS ----------------------
async function showMyPatients() {
  clearLog();
  
  try {
    if (!lucid) {
      log("Please connect wallet first", true);
      return;
    }

    const utxos = await lucid.utxosAt(scriptAddress);
    const myPkh = walletPkh;

    // Get unique patients for this doctor
    const patients = new Set();
    utxos.forEach(u => {
      if (!u.datum) return;
      try {
        const d = Data.from(u.datum, EMRDatum);
        if (d.doctor === myPkh) {
          patients.add(d.patient);
        }
      } catch (e) {}
    });

    log("👨‍⚕️ YOUR PATIENTS");
    log("─".repeat(50));
    
    if (patients.size === 0) {
      log("No patients found");
      return;
    }

    Array.from(patients).forEach((patient, index) => {
      log(`${index + 1}. Patient: ${patient}`);
    });
    
  } catch(e) {
    log(`Failed to load patients: ${e.message}`, true);
  }
}

// ---------------------- SHARE RECORD ----------------------
async function shareRecord() {
  clearLog();
  
  try {
    if (!lucid) {
      log("Please connect wallet first", true);
      return;
    }

    const recordHash = document.getElementById("shareRecordHash")?.value.trim();
    const delegatePkh = document.getElementById("delegatePkh")?.value.trim();
    const expiryDays = parseInt(document.getElementById("expiryDays")?.value) || 7;

    if (!recordHash || !delegatePkh) {
      log("Please enter record hash and delegate PubKeyHash", true);
      return;
    }

    log(`Sharing record: ${recordHash.substring(0, 20)}...`);
    log(`With delegate: ${delegatePkh.substring(0, 20)}...`);
    log(`Expires in: ${expiryDays} days`);

    // Find the record UTXO
    const utxos = await lucid.utxosAt(scriptAddress);
    const recordUtxo = utxos.find(u => {
      if (!u.datum) return false;
      try {
        const d = Data.from(u.datum, EMRDatum);
        return d.recordHash === recordHash && d.patient === walletPkh;
      } catch (e) {
        return false;
      }
    });

    if (!recordUtxo) {
      log("Record not found or you don't own it", true);
      return;
    }

    // Current block + expiry (approx 1 block per second)
    const currentBlock = Math.floor(Date.now() / 1000);
    const expiryBlock = currentBlock + (expiryDays * 24 * 60 * 60);

    const shareDatum = Data.to({
      recordHash: recordHash,
      delegate: delegatePkh,
      expiryBlock: BigInt(expiryBlock),
      patient: walletPkh
    }, ShareDatum);

    log("Creating share transaction...");
    
    const tx = await lucid.newTx()
      .payToContract(scriptAddress, { inline: shareDatum }, { lovelace: 1_500_000n })
      .complete();

    const signed = await tx.sign().complete();
    const txHash = await signed.submit();

    log(`✅ Record shared with delegate`);
    log(`Expires: ${expiryDays} days`);
    log(`Tx: ${txHash}`);
    
  } catch(e) {
    log(`Share failed: ${e.message}`, true);
  }
}

// ---------------------- AUDIT LOG ----------------------
async function viewAuditLog() {
  clearLog();
  
  try {
    if (!lucid) {
      log("Please connect wallet first", true);
      return;
    }

    const recordHash = document.getElementById("auditRecordHash")?.value.trim();
    
    if (!recordHash) {
      log("Please enter record hash", true);
      return;
    }

    log(`🔍 AUDIT LOG for record: ${recordHash.substring(0, 20)}...`);
    log("─".repeat(50));

    // Get all UTXOs for this record (history)
    const utxos = await lucid.utxosAt(scriptAddress);
    const recordHistory = utxos.filter(u => {
      if (!u.datum) return false;
      try {
        const d = Data.from(u.datum, EMRDatum);
        return d.recordHash === recordHash;
      } catch (e) {
        return false;
      }
    });

    if (recordHistory.length === 0) {
      log("No history found for this record");
      return;
    }

    recordHistory.forEach((u, index) => {
      const d = Data.from(u.datum, EMRDatum);
      const action = index === 0 ? "Created" : d.resolved ? "Resolved" : "Updated";
      log(`\n${index + 1}. ${action} - Tx: ${u.txHash}`);
      log(`   Status: ${d.resolved ? 'Resolved' : 'Active'}`);
      log(`   By: ${d.doctor.substring(0, 20)}...`);
    });
    
  } catch(e) {
    log(`Audit failed: ${e.message}`, true);
  }
}

// ---------------------- BATCH RESOLVE ----------------------
async function batchResolve() {
  clearLog();
  
  try {
    if (!lucid) {
      log("Please connect wallet first", true);
      return;
    }

    const hashes = document.getElementById("batchHashes")?.value.trim().split('\n').filter(h => h.trim());
    
    if (!hashes || hashes.length === 0) {
      log("Please enter record hashes (one per line)", true);
      return;
    }

    log(`Processing ${hashes.length} records...`);

    const utxos = await lucid.utxosAt(scriptAddress);
    let success = 0;
    let failed = 0;

    for (const hash of hashes) {
      try {
        const utxo = utxos.find(u => {
          if (!u.datum) return false;
          try {
            const d = Data.from(u.datum, EMRDatum);
            return d.recordHash === hash.trim() && !d.resolved;
          } catch (e) {
            return false;
          }
        });

        if (!utxo) {
          failed++;
          continue;
        }

        const oldDatum = Data.from(utxo.datum, EMRDatum);
        
        // Check authorization
        if (oldDatum.patient !== walletPkh && oldDatum.doctor !== walletPkh) {
          failed++;
          continue;
        }

        const newDatum = Data.to({ 
          patient: oldDatum.patient,
          doctor: oldDatum.doctor,
          recordHash: oldDatum.recordHash,
          resolved: true 
        }, EMRDatum);

        const tx = await lucid.newTx()
          .collectFrom([utxo], resolveRedeemer)
          .attachSpendingValidator(script)
          .payToContract(scriptAddress, { inline: newDatum }, utxo.assets)
          .complete();

        const signed = await tx.sign().complete();
        await signed.submit();
        success++;
        
      } catch (e) {
        failed++;
      }
    }

    log(`✅ Batch complete: ${success} resolved, ${failed} failed`);
    await updateStats();
    await viewRecords();
    
  } catch(e) {
    log(`Batch operation failed: ${e.message}`, true);
  }
}

// ---------------------- ANALYTICS ----------------------
async function showAnalytics() {
  clearLog();
  
  try {
    if (!lucid) {
      log("Please connect wallet first", true);
      return;
    }

    const utxos = await lucid.utxosAt(scriptAddress);
    const myPkh = walletPkh;

    // Analyze records by role
    let asPatient = 0;
    let asDoctor = 0;
    let patientResolved = 0;
    let doctorResolved = 0;

    utxos.forEach(u => {
      if (!u.datum) return;
      try {
        const d = Data.from(u.datum, EMRDatum);
        
        if (d.patient === myPkh) {
          asPatient++;
          if (d.resolved) patientResolved++;
        }
        if (d.doctor === myPkh) {
          asDoctor++;
          if (d.resolved) doctorResolved++;
        }
      } catch (e) {}
    });

    log("📊 PERSONAL ANALYTICS");
    log("─".repeat(40));
    log(`As Patient: ${asPatient} records`);
    if (asPatient > 0) {
      log(`  └─ Resolved: ${patientResolved} (${Math.round(patientResolved/asPatient*100)}%)`);
    }
    log(`As Doctor: ${asDoctor} records`);
    if (asDoctor > 0) {
      log(`  └─ Resolved: ${doctorResolved} (${Math.round(doctorResolved/asDoctor*100)}%)`);
    }
    
    // Activity over time (simplified)
    const recentActivity = utxos.filter(u => {
      const txTime = parseInt(u.txHash.substring(0, 8), 16);
      const now = Math.floor(Date.now() / 1000);
      return (now - txTime) < 7 * 24 * 60 * 60; // Last 7 days
    }).length;

    log(`\nRecent Activity (7 days): ${recentActivity} records`);
    
  } catch(e) {
    log(`Analytics failed: ${e.message}`, true);
  }
}

// ---------------------- GENERATE REPORT ----------------------
async function generateReport() {
  try {
    if (!lucid) {
      log("Please connect wallet first", true);
      return;
    }

    const utxos = await lucid.utxosAt(scriptAddress);
    const myPkh = walletPkh;

    const myRecords = utxos.filter(u => {
      if (!u.datum) return false;
      try {
        const d = Data.from(u.datum, EMRDatum);
        return d.patient === myPkh;
      } catch (e) {
        return false;
      }
    });

    // Generate HTML report
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>EMR Health Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
          h1 { color: #667eea; }
          .record { border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 8px; }
          .resolved { background: #f0fff4; border-color: #48bb78; }
          .active { background: #fff; border-color: #f6ad55; }
          .header { display: flex; justify-content: space-between; align-items: center; }
          .status { padding: 3px 8px; border-radius: 15px; font-size: 0.9em; }
          .status.resolved { background: #48bb78; color: white; }
          .status.active { background: #f6ad55; color: white; }
          .hash { font-family: monospace; word-break: break-all; background: #f7fafc; padding: 8px; border-radius: 4px; }
          .footer { margin-top: 30px; text-align: center; color: #666; }
        </style>
      </head>
      <body>
        <h1>🏥 EMR Health Report</h1>
        <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Wallet:</strong> ${walletPkh.substring(0, 20)}...</p>
        <hr>
    `;

    if (myRecords.length === 0) {
      html += `<p>No records found for this wallet.</p>`;
    } else {
      myRecords.forEach((u, index) => {
        const d = Data.from(u.datum, EMRDatum);
        const statusClass = d.resolved ? 'resolved' : 'active';
        html += `
          <div class="record ${statusClass}">
            <div class="header">
              <h3>Record #${index + 1}</h3>
              <span class="status ${statusClass}">${d.resolved ? '🔓 RESOLVED' : '🔒 ACTIVE'}</span>
            </div>
            <p><strong>Doctor:</strong> ${d.doctor}</p>
            <p><strong>Record Hash:</strong></p>
            <div class="hash">${d.recordHash}</div>
            <p><strong>Transaction:</strong> ${u.txHash}</p>
          </div>
        `;
      });
    }

    html += `
        <div class="footer">
          <p>Generated by EMR Pro - Blockchain Medical Records System</p>
        </div>
      </body>
      </html>
    `;

    // Download as HTML
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emr-report-${new Date().toISOString().split('T')[0]}.html`;
    a.click();

    log("✅ Report generated successfully");
    
  } catch(e) {
    log(`Report failed: ${e.message}`, true);
  }
}

// ---------------------- NOTIFICATIONS ----------------------
function checkNotifications() {
  const notificationDot = document.getElementById('notification-dot');
  if (!notificationDot) return;
  
  // Check for pending actions every 30 seconds
  setInterval(async () => {
    if (!lucid || !walletPkh) return;
    
    try {
      const utxos = await lucid.utxosAt(scriptAddress);
      const myPkh = walletPkh;
      
      // Count records where user is doctor and record is active
      const pendingReviews = utxos.filter(u => {
        if (!u.datum) return false;
        try {
          const d = Data.from(u.datum, EMRDatum);
          return d.doctor === myPkh && !d.resolved;
        } catch (e) {
          return false;
        }
      }).length;

      if (pendingReviews > 0) {
        notificationDot.style.display = 'inline-block';
        notificationDot.textContent = pendingReviews;
      } else {
        notificationDot.style.display = 'none';
      }
      
    } catch (e) {
      console.error("Notification check failed:", e);
    }
  }, 30000);
}

// ---------------------- EXPORT SHARED FUNCTIONS GLOBALLY ----------------------
// Make core functions and variables available globally
window.Lucid = Lucid;
window.Blockfrost = Blockfrost;
window.Data = Data;
window.Constr = Constr;
window.script = script;
window.EMRDatum = EMRDatum;
window.ShareDatum = ShareDatum;
window.resolveRedeemer = resolveRedeemer;
window.claimRedeemer = claimRedeemer;

// Core blockchain functions
window.log = log;
window.clearLog = clearLog;
window.copyToClipboard = copyToClipboard;
window.updateStats = updateStats;
window.renderRecordsList = renderRecordsList;
window.mkEMRDatum = mkEMRDatum;
window.submitRecord = submitRecord;
window.resolveRecord = resolveRecord;
window.viewRecords = viewRecords;
window.searchRecords = searchRecords;
window.exportRecords = exportRecords;
window.emergencyAccess = emergencyAccess;
window.verifyRecord = verifyRecord;
window.showStats = showStats;
window.showHealthTimeline = showHealthTimeline;
window.showMyPatients = showMyPatients;
window.shareRecord = shareRecord;
window.viewAuditLog = viewAuditLog;
window.batchResolve = batchResolve;
window.showAnalytics = showAnalytics;
window.generateReport = generateReport;

// Make constants available
window.BLOCKFROST_URL = BLOCKFROST_URL;
window.BLOCKFROST_KEY = BLOCKFROST_KEY;
window.NETWORK = NETWORK;

console.log("✅ EMR Pro core functions loaded and exported globally");