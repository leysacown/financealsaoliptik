let transactions = JSON.parse(localStorage.getItem('finance_transactions_alsa')) || [];

function formatRupiah(num) {
  return 'Rp ' + num.toLocaleString('id-ID');
}

function addTransaction() {
  const descInput = document.getElementById('desc');
  const amountInput = document.getElementById('amount');
  
  const desc = descInput.value;
  const amount = parseFloat(amountInput.value);

  if (desc.trim() === '' || isNaN(amount)) {
    alert('Mohon isi keterangan dan jumlah dengan benar! 🌸');
    return;
  }

  const transaction = { 
    id: Date.now(), 
    desc, 
    amount 
  };
  
  transactions.push(transaction);
  localStorage.setItem('finance_transactions_alsa', JSON.stringify(transactions));
  
  updateUI();
  
  descInput.value = '';
  amountInput.value = '';
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  localStorage.setItem('finance_transactions_alsa', JSON.stringify(transactions));
  updateUI();
}

function updateUI() {
  const list = document.getElementById('list');
  const balanceEl = document.getElementById('balance');
  
  if (!list || !balanceEl) return;
  
  list.innerHTML = '';

  let total = 0;
  transactions.forEach(t => {
    total += t.amount;
    
    const li = document.createElement('li');
    // Menentukan apakah pemasukan atau pengeluaran berdasarkan nilai positif/negatif
    const isIncome = t.amount >= 0;
    const sign = isIncome ? '+' : '';
    
    li.innerHTML = `
      <span>✨ ${t.desc}</span>
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-weight: 700; color: ${isIncome ? '#10b981' : '#f43f5e'};">
          ${sign}${formatRupiah(t.amount)}
        </span>
        <button class="delete-btn" onclick="deleteTransaction(${t.id})" title="Hapus">✕</button>
      </div>
    `;
    list.appendChild(li);
  });

  balanceEl.innerText = formatRupiah(total);
}

// Inisialisasi saat halaman dimuat
updateUI();
