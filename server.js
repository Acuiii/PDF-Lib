// const express = require('express');
// const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
// const cors = require('cors');
// // const fetch = require('node-fetch');

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.post('/generate_pdf', async (req, res) => {
//     try {
//         const { name, ic, phone, carModel, startDate, endDate, signature } = req.body;

//         const start = new Date(startDate);
//         const end = new Date(endDate);

//         if (end < start) {
//             return res.status(400).json({ error: 'End date cannot be before start date.' });
//         }

//         const timeDiff = end.getTime() - start.getTime();
//         const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

//         const pdfDoc = await PDFDocument.create();
//         const page = pdfDoc.addPage([600, 800]);
//         const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

//         const { width, height } = page.getSize();
//         const fontSize = 12;

//         page.drawText('Perjanjian Sewa Kereta HAI Rental Sdn Bhd', {
//             x: 50,
//             y: height - 50,
//            // z: width - 50, acui add
//             size: 24,
//             font: timesRomanFont,
//             color: rgb(0, 0, 0),
//         });

//         const content = `
//         HA1 Berkat Car Rental dan penyewa dengan ini bersetuju dengan perkara-perkara berikut :

//             1.  Penyewa hendaklah bertanggungjawab ke atas kemalangan yang berlaku semasa penyewaan kereta 
//                     termasuk pembayaran ganti rugi yang melibatkan kereta yang disewa dan kereta pihak ketiga
//                     yang terlibat, jika ada. Penyewa juga bertanggungjawab untuk sebarang bayaran kecederaan 
//                     diri dan pihak ketiga akibat kemalangan.
                
//             2.  Penyewa bertanggungjawab dan menanggung kos semua kesalahan termasuk saman, kompaun, denda
//                     dan kes mahkamah yang disebabkan oleh penyewa. Tambahan RM50 akan dikenakan kepada penyewa 
//                     bagi setiap saman yang dibayar oleh HA1 Berkat Car Rental.
                
//             3.  HA1 Berkat Car Rental berhak menuntut semua kos yang terlibat termasuk saman, kompaun, denda
//                     dan lain lain caj yang wajar akibat kesalahan dan kerugian yang dilakukan oleh penyewa.
                
//             4.  HA1 Berkat Car Rental berhak mendaftarkan maklumat penyewa kepada mana-mana persatuan, syarikat,
//                     atau mana-mana organisasi jika penyewa tidak membuat pembayaran penuh bagi semua tuntutan oleh
//                     HA1 Berkat Car Rental.
                
//             5.  Penyewa hendaklah menanggung semua kos pembaikan kenderaan yang mengalami kerosakan semasa 
//                     disewa. Jika kenderaan rosak akibat bencana alam, penyewa hendaklah menanggung semua kos 
//                     pembaikan.
                
//             6.  Penyewa bertanggungjawab memulangkan kenderaan untuk diservis dan diselenggara setiap 5,000KM,
//                     sebarang kerosakan pada kenderaan akibat lewat penyelenggaraan akan menjadi tanggungjawab 
//                     penyewa.
                
//             7.  Penyewa dilarang menggunakan kereta sewa bagi tujuan jenayah dan sebarang perbuatan yang 
//                     melanggar undang-undang yang dikuatkuasakan di Malaysia.
                
//             8.  HA1 Berkat Car Rental berhak untuk mengambil semula kenderaan tanpa notis sekiranya didapati
//                     penyewa menggunakan kenderaan untuk tujuan jenayah, perkara yang tidak bermoral dan tidak 
//                     membayar bayaran sambungan sewa dalam tempoh 24 jam.
                
//             9.  Sekiranya berlaku kemalangan yang mengakibatkan kenderaan sewaan mengalami <i>total lost</i>,
//                     penyewa perlu membayar penalti sejumlah antara RM5,000 sehingga RM10,000 berdasarkan jenis 
//                     kenderaan yang disewa. Jika kemalangan melibatkan tuntutan insurans, penyewa perlu membayar 
//                     pampasan untuk kereta dalam proses pembaikan. Jika kemalangan kecil tidak melibatkan tuntutan 
//                     insurans penyewa mesti membayar tunai berdasarkan kerosakan.
                
//             10. Jumlah perbatuan maksimum bagi satu hari sewaan adalah sejauh 350KM. HA1 Berkat Car Rental 
//                     tidak akan memulangkan deposit sewaan jika didapati jumlah perbatuan melebihi had yang 
//                     ditetapkan. 
                
//             11. HA1 Berkat Car Rental tidak akan memulangkan semula bayaran sewaan jika penyewa menghantar 
//                     kenderaan lebih awal dari tempoh masa sewaan yang telah dibayar.
                
//             12. Untuk tambahan masa atau hari sewaan, kadar bayaran adalah mengikut jumlah yang ditetapkan oleh
//                     pihak HA1 Berkat Car Rental.
                
//             13.  Penyewa tidak dibenarkan merokok atau membawa bahan-bahan yang boleh menyebabkan kenderaan yang
//                     dipulangkan berbau busuk atau kotor atau mana-mana keadaan yang tidak dirasakan wajar. HA1 
//                     Berkat Car Rental tidak akan memulangkan deposit sewaan jika mendapati perkara tersebut berlaku
//                     pada kenderaan yang telah disewa.
                
//             14.    Bayaran penalti akan dikenakan jika penyewa didapati mengubahsuai, menukar atau mengambil 
//                     apa-apa bahagian dari kenderaan disewa tanpa pengetahuan dari pihak HA1 Berkat Car Rental.

        
//                     I, ${name}, with IC number ${ic}, 
        
//                     understand and agree to rent a car model ${carModel} 
        
//                     for ${totalDays} day(s) from ${startDate} to ${endDate}.

       
//                     If there is any information that I need to share, please contact me at ${phone}.

//         `;

//         const textLines = content.split('\n');
//         let textY = height - 100;

//         textLines.forEach(line => {
//             page.drawText(line.trim(), {
//                 x: 50,
//                 y: textY,
//                 size: fontSize,
//                 font: timesRomanFont,
//                 color: rgb(0, 0, 0),
//             });
//             textY -= fontSize + 8;
//         });
        
//         const fetch = (await import('node-fetch')).default;
//         // Add signature image
//         if (signature) {
//             const signatureImageBytes = await fetch(signature).then(res => res.arrayBuffer());
//             const signatureImage = await pdfDoc.embedPng(signatureImageBytes);
//             const signatureDims = signatureImage.scale(0.5);
//             page.drawImage(signatureImage, {
//                 x: 50,
//                 y: textY - signatureDims.height - 10,
//                 width: signatureDims.width,
//                 height: signatureDims.height
//             });
//             textY -= signatureDims.height + 20;
//         }

//         page.drawText(`Thank you,\n${name}`, {
//             x: 50,
//             y: textY,
//             size: fontSize,
//             font: timesRomanFont,
//             color: rgb(0, 0, 0),
//         });

//         const pdfBytes = await pdfDoc.save();

//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', 'attachment; filename=agreement.pdf');
//         res.send(Buffer.from(pdfBytes));
//     } catch (error) {
//         console.error('Error generating PDF:', error);
//         res.status(500).send('Failed to generate PDF');
//     }
// });

// app.listen(8000, () => {
//     console.log('Server is running on port 8000');
// });


const express = require('express');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/generate_pdf', async (req, res) => {
    try {
        const { name, ic, phone, carModel, startDate, endDate, signature } = req.body;

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end < start) {
            return res.status(400).json({ error: 'End date cannot be before start date.' });
        }

        const timeDiff = end.getTime() - start.getTime();
        const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        const pdfDoc = await PDFDocument.create();
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        const fontSize = 12;
        const lineHeight = fontSize + 4;
        const margin = 50;
        const pageWidth = 612;
        const pageHeight = 792;
        let y = pageHeight - margin;

        // Content to add in the PDF
        const content = `
        HA1 Berkat Car Rental dan penyewa dengan ini bersetuju dengan perkara-perkara berikut :

            1.  Penyewa hendaklah bertanggungjawab ke atas kemalangan yang berlaku semasa penyewaan kereta 
                    termasuk pembayaran ganti rugi yang melibatkan kereta yang disewa dan kereta pihak ketiga
                    yang terlibat, jika ada. Penyewa juga bertanggungjawab untuk sebarang bayaran kecederaan 
                    diri dan pihak ketiga akibat kemalangan.
                
            2.  Penyewa bertanggungjawab dan menanggung kos semua kesalahan termasuk saman, kompaun, denda
                    dan kes mahkamah yang disebabkan oleh penyewa. Tambahan RM50 akan dikenakan kepada penyewa 
                    bagi setiap saman yang dibayar oleh HA1 Berkat Car Rental.
                
            3.  HA1 Berkat Car Rental berhak menuntut semua kos yang terlibat termasuk saman, kompaun, denda
                    dan lain lain caj yang wajar akibat kesalahan dan kerugian yang dilakukan oleh penyewa.
                
            4.  HA1 Berkat Car Rental berhak mendaftarkan maklumat penyewa kepada mana-mana persatuan, syarikat,
                    atau mana-mana organisasi jika penyewa tidak membuat pembayaran penuh bagi semua tuntutan oleh
                    HA1 Berkat Car Rental.
                
            5.  Penyewa hendaklah menanggung semua kos pembaikan kenderaan yang mengalami kerosakan semasa 
                    disewa. Jika kenderaan rosak akibat bencana alam, penyewa hendaklah menanggung semua kos 
                    pembaikan.
                
            6.  Penyewa bertanggungjawab memulangkan kenderaan untuk diservis dan diselenggara setiap 5,000KM,
                    sebarang kerosakan pada kenderaan akibat lewat penyelenggaraan akan menjadi tanggungjawab 
                    penyewa.
                
            7.  Penyewa dilarang menggunakan kereta sewa bagi tujuan jenayah dan sebarang perbuatan yang 
                    melanggar undang-undang yang dikuatkuasakan di Malaysia.
                
            8.  HA1 Berkat Car Rental berhak untuk mengambil semula kenderaan tanpa notis sekiranya didapati
                    penyewa menggunakan kenderaan untuk tujuan jenayah, perkara yang tidak bermoral dan tidak 
                    membayar bayaran sambungan sewa dalam tempoh 24 jam.
                
            9.  Sekiranya berlaku kemalangan yang mengakibatkan kenderaan sewaan mengalami <i>total lost</i>,
                    penyewa perlu membayar penalti sejumlah antara RM5,000 sehingga RM10,000 berdasarkan jenis 
                    kenderaan yang disewa. Jika kemalangan melibatkan tuntutan insurans, penyewa perlu membayar 
                    pampasan untuk kereta dalam proses pembaikan. Jika kemalangan kecil tidak melibatkan tuntutan 
                    insurans penyewa mesti membayar tunai berdasarkan kerosakan.
                
            10. Jumlah perbatuan maksimum bagi satu hari sewaan adalah sejauh 350KM. HA1 Berkat Car Rental 
                    tidak akan memulangkan deposit sewaan jika didapati jumlah perbatuan melebihi had yang 
                    ditetapkan. 
                
            11. HA1 Berkat Car Rental tidak akan memulangkan semula bayaran sewaan jika penyewa menghantar 
                    kenderaan lebih awal dari tempoh masa sewaan yang telah dibayar.
                
            12. Untuk tambahan masa atau hari sewaan, kadar bayaran adalah mengikut jumlah yang ditetapkan oleh
                    pihak HA1 Berkat Car Rental.
                
            13.  Penyewa tidak dibenarkan merokok atau membawa bahan-bahan yang boleh menyebabkan kenderaan yang
                    dipulangkan berbau busuk atau kotor atau mana-mana keadaan yang tidak dirasakan wajar. HA1 
                    Berkat Car Rental tidak akan memulangkan deposit sewaan jika mendapati perkara tersebut berlaku
                    pada kenderaan yang telah disewa.
                
            14.    Bayaran penalti akan dikenakan jika penyewa didapati mengubahsuai, menukar atau mengambil 
                    apa-apa bahagian dari kenderaan disewa tanpa pengetahuan dari pihak HA1 Berkat Car Rental.

        
                    I, ${name}, with IC number ${ic}, understand and agree to rent 
                    a car model ${carModel} for ${totalDays} day(s) from ${startDate} to ${endDate}.

                    If there is any information that I need to share, please contact me at ${phone}.
        `;

        const lines = content.split('\n');

        let page = pdfDoc.addPage([pageWidth, pageHeight]);

        for (const line of lines) {
            const text = line.trim();
            const textWidth = timesRomanFont.widthOfTextAtSize(text, fontSize);
            const textHeight = timesRomanFont.heightAtSize(fontSize);

            if (y - textHeight < margin) {
                page = pdfDoc.addPage([pageWidth, pageHeight]);
                y = pageHeight - margin;
            }

            page.drawText(text, {
                x: margin,
                y: y,
                size: fontSize,
                font: timesRomanFont,
                color: rgb(0, 0, 0),
            });

            y -= lineHeight;
        }

        // Add signature image
        if (signature) {
            const signatureImageBytes = await axios.get(signature, { responseType: 'arraybuffer' }).then(res => res.data);
            const signatureImage = await pdfDoc.embedPng(signatureImageBytes);
            const signatureDims = signatureImage.scale(0.5);
            if (y - signatureDims.height < margin) {
                page = pdfDoc.addPage([pageWidth, pageHeight]);
                y = pageHeight - margin;
            }
            page.drawImage(signatureImage, {
                x: margin,
                y: y - signatureDims.height,
                width: signatureDims.width,
                height: signatureDims.height,
            });
            y -= signatureDims.height + lineHeight;
        }

        const pdfBytes = await pdfDoc.save();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=agreement.pdf');
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Failed to generate PDF');
    }
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
