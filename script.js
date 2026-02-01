// RGPV Grade Ranges including Grace (D##)
const gradeRanges = {
    theory: {
        10:{ min:91, max:100, grade: 'A+', maxMarks: 100 },
        9: { min:81, max:90, grade: 'A', maxMarks: 100 },
        8: { min:71, max:80, grade: 'B+', maxMarks: 100 },
        7: { min:61, max:70, grade: 'B', maxMarks: 100 },
        6: { min:51, max:60, grade: 'C+', maxMarks: 100 },
        5: { min:41, max:50, grade: 'C', maxMarks: 100 },
        4: { min:31, max:40, grade: 'D', maxMarks: 100 },
        3: { min:26, max:30, grade: 'D##', maxMarks: 100 }, // Grace marks
        0: { min:0,  max:25, grade: 'F', maxMarks: 100 }
    },
    practical: {
        10: { min:46, max:50, grade: 'A+', maxMarks: 50 },
        9: { min:41, max:45, grade: 'A', maxMarks: 50 },
        8: { min:36, max:40, grade: 'B+', maxMarks: 50 },
        7: { min:31, max:35, grade: 'B', maxMarks: 50 },
        6: { min:26, max:30, grade: 'C+', maxMarks: 50 },
        5: { min:21, max:25, grade: 'C', maxMarks: 50 },
        4: { min:20, max:20, grade: 'D', maxMarks: 50 },
        3: { min:15, max:19, grade: 'D##', maxMarks: 50 }, // Grace practical
        0: { min:0, max:14, grade: 'F', maxMarks: 50 }
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => addSubject());

// Add Subject
function addSubject(name='', credits='', type='theory', grade='') {
    const container = document.getElementById('subjectInputs');
    const row = document.createElement('div');
    row.className = 'subject-row';
    row.innerHTML = `
        <input type="text" placeholder="Subject" value="${name}" class="subject-name">
        <input type="number" placeholder="Credits" value="${credits}" min="0" step="0.5" class="subject-credits">
        <select class="subject-type">
            <option value="theory" ${type==='theory'?'selected':''}>Theory</option>
            <option value="practical" ${type==='practical'?'selected':''}>Practical</option>
        </select>
        <select class="subject-grade">
            <option value="">Select Grade</option>
            <option value="10" ${grade==10?'selected':''}>A+</option>
            <option value="9" ${grade==9?'selected':''}>A</option>
            <option value="8" ${grade==8?'selected':''}>B+</option>
            <option value="7" ${grade==7?'selected':''}>B</option>
            <option value="6" ${grade==6?'selected':''}>C+</option>
            <option value="5" ${grade==5?'selected':''}>C</option>
            <option value="4" ${grade==4?'selected':''}>D</option>
            <option value="3" ${grade==3?'selected':''}>D##</option>
            <option value="0" ${grade==0?'selected':''}>F</option>
        </select>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(row);
}

// Get Subjects
function getSubjectsData() {
    const rows = document.querySelectorAll('.subject-row');
    const subjects = [];
    rows.forEach(r=>{
        const name=r.querySelector('.subject-name').value.trim();
        const credits=parseFloat(r.querySelector('.subject-credits').value)||0;
        const type=r.querySelector('.subject-type').value;
        const grade=parseInt(r.querySelector('.subject-grade').value);
        if(name && credits>0 && !isNaN(grade)) subjects.push({name,credits,type,grade});
    });
    return subjects;
}

// Calculate SGPA
function calculateSGPA() {
    const subjects=getSubjectsData();
   
    const errorDiv = document.getElementById('errorMsg');

if(subjects.length === 0) {
    errorDiv.innerText = "Please enter valid input!";
    document.getElementById('resultsSection').style.display = 'none';
    return;
} else {
    errorDiv.innerText = ""; // clear error if inputs exist
}


    let totalPoints=0, totalCredits=0, html='';

    subjects.forEach(s=>{
        const range=gradeRanges[s.type][s.grade];
        const marks=Math.floor(Math.random()*(range.max-range.min+1))+range.min;
       
       
        let gradepoint = s.grade;
        if(range.grade==='D##') gradepoint=4;

        const points=s.credits*gradepoint;
        

        totalPoints+=points;
        totalCredits+=s.credits;

        html+=`
            <tr>
                <td>${s.name}</td>
                <td>${s.type}</td>
                <td>${s.credits}</td>
                <td>${range.grade} ${range.grade==='D##'?"(Grace)":""}</td>
                <td>${marks}/${range.maxMarks}</td>
                <td>${points.toFixed(1)}</td>
            </tr>
        `;
    });

    const sgpa=(totalPoints/totalCredits).toFixed(2);
    document.getElementById('resultsBody').innerHTML=html;
    document.getElementById('sgpaResult').innerHTML=`SGPA: ${sgpa}`;
    document.getElementById('resultsSection').style.display='block';
}

// Reset
function resetAll() {
    // Directly reset without any popup
    document.getElementById('subjectInputs').innerHTML = '';
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('errorMsg').innerText = ''; // clear error message
    addSubject();
}


