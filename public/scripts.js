// function goBack() {
//     window.history.back();
// }

// function confirm() {
//     alert('Confirmed!');
// }

// function showTimePicker() {
//     // แทนที่ด้วยการทำงานที่คุณต้องการ เช่น ใช้ไลบรารีสำหรับการเลือกเวลา
//     alert('Time picker not implemented');
// }

// function showDatePicker(type) {
//     // แทนที่ด้วยการทำงานที่คุณต้องการ เช่น ใช้ไลบรารีสำหรับการเลือกวันที่
//     alert(`Date picker for ${type} not implemented`);
// }
// document.addEventListener('DOMContentLoaded', function() {
//     flatpickr("#start-date", { dateFormat: "Y-m-d" });
//     flatpickr("#end-date", { dateFormat: "Y-m-d" });
//     flatpickr("#time", { enableTime: true, noCalendar: true, dateFormat: "H:i" });
// });
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded');
});

document.addEventListener('DOMContentLoaded', function () {
    const facultySelect = document.getElementById('filter-faculty');
    const majorSelect = document.getElementById('filter-major');
    const createPostBox = document.getElementById('create-post-box'); // แก้ไข ID

    const majors = {
        'คณะวิทยาศาสตร์และนวัตกรรมดิจิทัล': [
            'สาขาคณิตศาสตร์และสถิติ',
            'สาขาเคมี',
            'สาขาชีววิทยา',
            'สาขาฟิสิกส์',
            'สาขาเทคโนโลยีสารสนเทศ',
            'สาขาวิทยาการคอมพิวเตอร์',
            'สาขาวิทยาการคอมพิวเตอร์และสารสนเทศ',
            'สาขาวิทยาศาสตร์ชีวภาพและสิ่งแวดล้อม',
            'สาขาวิทยาศาสตร์และคณิตศาสตร์พื้นฐาน'
        ],
        'คณะวิทยาการสุขภาพและการกีฬา': [
            'สาขาสาธารณสุขชุมชน',
            'สาขาวิทยาศาสตร์การกีฬา',
            'สาขาอาชีวอนามัยและความปลอดภัย',
            'สาขาการแพทย์แผนไทย'
        ],
        'คณะเทคโนโลยีและการพัฒนาชุมชน': [
            'สาขาเทคโนโลยีและนวัตกรรมการผลิตพืช',
            'สาขาส่งเสริมการเกษตรและพัฒนาชุมชน',
            'สาขาสัตวศาสตร์'
        ],
        'คณะวิศวกรรมศาสตร์': [
            'สาขาวิศวกรรมเมคคาทรอนิกส์',
            'สาขาวิศวกรรมยางและพอลิเมอร์',
            'สาขาวิศวกรรมเครื่องกล'
        ],
        'คณะพยาบาลศาสตร์': [
            '-',
        ],
        'คณะนิติศาสตร์': [
            '-',
        ],
        'คณะอุตสาหกรรมเกษตรและชีวภาพ': [
            'สาขาวิทยาศาสตร์และเทคโนโลยีอาหาร',
            'สาขาวิทยาศาสตร์อาหารและโภชนาการ',
            'สาขาเทคโนโลยีเครื่องสำอางและผลิตภัณฑ์เสริมอาหาร',
            'สาขาเทคโนโลยีเครื่องสำอางและผลิตภัณฑ์เสริมอาหาร'
        ],
        'คณะศึกษาศาสตร์': [
            'สาขาการวัดและประเมินทางการศึกษา',
            'สาขาการศึกษา วิชาเอกการประถมศึกษา',
            'สาขาการศึกษา วิชาเอกการศึกษาปฐมวัย',
            'สาขาการศึกษา วิชาเอกจิตวิทยาการศึกษาและการแนะแนว',
            'สาขาการศึกษา วิชาเอกเทคโนโลยีและสื่อสารการศึกษา',
            'สาขาคณิตศาสตร์',
            'สาขาชีววิทยา',
            'สาขาพลศึกษา',
            'สาขาฟิสิกส์',
            'สาขาภาษาอังกฤษ',
            'สาขาภาษาไทย',
            'สาขาศิลปศึกษา',
            'สาขาสังคมศึกษา',
            'สาขาเคมี',
            'สาขาเทคโนโลยีและสื่อสารการศึกษา'
        ],
        'คณะสหวิทยาการและการประกอบการ': [
            'วิชาภาษาอังกฤษเพื่อการสื่อสารเชิงประกอบการ'
        ]
    };

    facultySelect.addEventListener('change', function () {
        const selectedFaculty = facultySelect.value;
        const majorsList = majors[selectedFaculty] || [];

        // Clear current options
        majorSelect.innerHTML = '<option value="">เลือกสาขา</option>';

        // Add new options
        majorsList.forEach(major => {
            const option = document.createElement('option');
            option.value = major;
            option.textContent = major;
            majorSelect.appendChild(option);
        });
    });

    createPostBox.addEventListener('click', function () {
        window.location.href = 'postperfessor.html'; // เปลี่ยนเส้นทางไปยังหน้าที่ต้องการ
    });
});


// //ปุ่มลบแก้ไขของนิสิต
// function toggleMenu(icon) {
//     const menu = icon.nextElementSibling;
//     if (menu.style.display === 'block') {
//         menu.style.display = 'none';
//     } else {
//         menu.style.display = 'block';
//     }
// }

// function editPost() {
//     alert("คุณต้องการแก้ไขโพสต์นี้");
//     // เพิ่มฟังก์ชันสำหรับการแก้ไขโพสต์ที่นี่
// }

// function deletePost() {
//     if (confirm("คุณต้องการลบโพสต์นี้ใช่หรือไม่?")) {
//         alert("โพสต์นี้ถูกลบแล้ว");
//         // เพิ่มฟังก์ชันสำหรับการลบโพสต์ที่นี่
//     }
// }
