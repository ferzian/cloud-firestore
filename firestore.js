const { Firestore } = require("@google-cloud/firestore");
const db = new Firestore();

async function store_data() {
    // Membuat Collection root-level
    const doctorsCollections = db.collection('dokter');
    console.log("Collections 'dokter' berhasil dibuat.");

    const pasienCollections = db.collection('pasien');
    console.log("Collections 'pasien' berhasil dibuat.");

    // Membuat dokumen: Dokter Eros
    const erosDoc = await doctorsCollections.doc("Dokter Eros");
    console.log("Dokumen atas nama Dokter Eros berhasil dibuat.");

    const ayuDoc = await pasienCollections.doc("Pasien Ayu");
    console.log("Dokumen atas nama Pasien Ayu berhasil dibuat.");

    // Menambahkan data pribadi Dokter Eros
    const profileEros = {
        nama: "dr. Eros",
        keahlian: "Dokter Kulit",
        almamater: "Universitas A"
    }
    await erosDoc.set(profileEros);
    console.log("Data berhasil ditambahkan ke dokumen Eros");

    const profileAyu = {
        nama_pasien: {
            depan: "Ayu",
            belakang: "Santoso"
        },
    }
    await ayuDoc.set(profileAyu);
    console.log("Data berhasil ditambahkan ke dokumen Ayu");

    // Membuat subcollection: Konsultasi
    const erosSubcollections = erosDoc.collection("Konsultasi");
    console.log("Subcollection Konsultasi berhasil dibuat.");

    const historyConsultations = {
        nama_pasien: {
            depan: "Antony",
            belakang: "Gunawan",
        },
        waktu_konsultasi: Date.now().toString()
    }
    await erosSubcollections.doc("Antony").set(historyConsultations);
    console.log('Data berhasil ditambahkan.');
}
store_data().catch(console.error)
