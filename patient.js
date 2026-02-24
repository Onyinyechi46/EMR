// Patient-specific functionality
let patientData = {
  nextCheckup: null,
  appointments: [],
  prescriptions: [],
  shares: []
};

// Load patient dashboard
async function loadPatientDashboard() {
  if (!lucid || !walletPkh) return;
  
  try {
    const utxos = await lucid.utxosAt(scriptAddress);
    
    // Get patient's records
    const myRecords = utxos.filter(u => {
      if (!u.datum) return false;
      try {
        const d = Data.from(u.datum, EMRDatum);
        return d.patient === walletPkh;
      } catch (e) {
        return false;
      }
    });
    
    // Find next check-up (earliest future appointment)
    findNextCheckup(myRecords);
    
    // Get upcoming appointments
    getUpcomingAppointments(myRecords);
    
    // Get active prescriptions
    getActivePrescriptions(myRecords);
    
    // Get active shares
    getActiveShares();
    
    // Update stats
    updatePatientStats(myRecords);
    
    // Render timeline
    renderHealthTimeline(myRecords);
    
  } catch (e) {
    console.error("Failed to load patient dashboard:", e);
  }
}

function findNextCheckup(records) {
  const now = new Date();
  const futureRecords = records.filter(r => {
    const d = Data.from(r.datum, EMRDatum);
    // Check if record has follow-up date in metadata
    // You'd need to parse this from your record data
    return false; // Placeholder
  });
  
  if (futureRecords.length > 0) {
    // Sort by date and get earliest
    futureRecords.sort((a, b) => {
      // Sort logic here
      return 0;
    });
    
    const next = futureRecords[0];
    const d = Data.from(next.datum, EMRDatum);
    
    document.getElementById('next-checkup-details').innerHTML = `
      <p class="checkup-date">📅 ${new Date().toLocaleDateString()}</p>
      <p class="checkup-doctor">Dr. ${d.doctor.substring(0, 20)}...</p>
      <button onclick="scheduleFollowup()" class="btn-small">Schedule</button>
    `;
  } else {
    document.getElementById('next-checkup-details').innerHTML = `
      <p class="checkup-date">No upcoming check-ups</p>
      <button onclick="requestAppointment()" class="btn-small">Request</button>
    `;
  }
}

function getUpcomingAppointments(records) {
  // Filter records that are appointments
  const appointments = records.filter(r => {
    const d = Data.from(r.datum, EMRDatum);
    // Check if it's an appointment type
    return true; // Placeholder
  }).slice(0, 5);
  
  const container = document.getElementById('appointments-list');
  
  if (appointments.length === 0) {
    container.innerHTML = '<div class="empty-state">No upcoming appointments</div>';
    return;
  }
  
  let html = '';
  appointments.forEach(apt => {
    const d = Data.from(apt.datum, EMRDatum);
    html += `
      <div class="appointment-item">
        <div class="appointment-date">📅 ${new Date().toLocaleDateString()}</div>
        <div class="appointment-doctor">Dr. ${d.doctor.substring(0, 20)}...</div>
        <div class="appointment-status">${d.resolved ? 'Completed' : 'Upcoming'}</div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  document.getElementById('appointment-count').textContent = appointments.length;
}

function getActivePrescriptions(records) {
  // Filter prescription records
  const prescriptions = records.filter(r => {
    const d = Data.from(r.datum, EMRDatum);
    // Check if it's a prescription
    return true; // Placeholder
  }).slice(0, 5);
  
  const container = document.getElementById('prescriptions-list');
  
  if (prescriptions.length === 0) {
    container.innerHTML = '<div class="empty-state">No active prescriptions</div>';
    return;
  }
  
  let html = '';
  prescriptions.forEach(p => {
    html += `
      <div class="prescription-item">
        <div class="prescription-name">💊 Medication Name</div>
        <div class="prescription-doctor">Dr. Smith</div>
        <div class="prescription-refills">Refills: 2</div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function getActiveShares() {
  // Get records shared with this patient
  const container = document.getElementById('active-shares');
  
  // Placeholder
  container.innerHTML = `
    <div class="share-item">
      <div class="share-doctor">Dr. Johnson</div>
      <div class="share-expiry">Expires: 7 days</div>
    </div>
  `;
}

function updatePatientStats(records) {
  document.getElementById('total-records').textContent = records.length;
  document.getElementById('pending-results').textContent = '2'; // Placeholder
  document.getElementById('upcoming-appointments').textContent = '1'; // Placeholder
  document.getElementById('shared-access').textContent = '3'; // Placeholder
}

function renderHealthTimeline(records) {
  const timeline = document.getElementById('health-timeline');
  
  // Sort by date (most recent first)
  const sorted = records.sort((a, b) => {
    return parseInt(b.txHash.substring(0, 8), 16) - parseInt(a.txHash.substring(0, 8), 16);
  }).slice(0, 5);
  
  let html = '<div class="timeline">';
  sorted.forEach((r, index) => {
    const d = Data.from(r.datum, EMRDatum);
    const date = new Date(parseInt(r.txHash.substring(0, 8), 16) * 1000).toLocaleDateString();
    
    html += `
      <div class="timeline-item">
        <div class="timeline-date">${date}</div>
        <div class="timeline-content">
          <div class="timeline-title">Medical Record</div>
          <div class="timeline-doctor">Dr. ${d.doctor.substring(0, 20)}...</div>
          <div class="timeline-status ${d.resolved ? 'resolved' : 'active'}">
            ${d.resolved ? 'Resolved' : 'Active'}
          </div>
        </div>
      </div>
    `;
  });
  html += '</div>';
  
  timeline.innerHTML = html;
}

// Modal functions
function showShareModal() {
  document.getElementById('share-modal').style.display = 'flex';
}

function closeShareModal() {
  document.getElementById('share-modal').style.display = 'none';
}

function toggleRecordsView() {
  const view = document.getElementById('full-records-view');
  view.style.display = view.style.display === 'none' ? 'block' : 'none';
}

function requestAppointment() {
  log("📅 Appointment request feature coming soon");
}

function scheduleFollowup() {
  log("⏰ Follow-up scheduling coming soon");
}

// Initialize patient dashboard
window.addEventListener('load', async () => {
  if (window.lucid && window.walletPkh) {
    await loadPatientDashboard();
  }
});