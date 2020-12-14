class Student {
    constructor( fN, lN, y) {
        this.firstName = fN;
        this.lastName = lN;
        this.grade = y;
        this.scores = [];
    }
    fullName() {
        return `Hello ${this.lastName} ${this.firstName}`;
    }
    newYear() {
        this.grade++;
        return `New year! ${this.grade}`;
    }
    addScore(score) {
        this.scores.push(score);
        return this.scores;
    }
    static enrollStudents() {
        return "ENROLLING STUDENTS!";
    }
}

let firstSudent = new Student("sunmin", "Jung", 8);
let secondSudent = new Student("jw", "park", 9);

console.log(firstSudent.fullName(), secondSudent.fullName())
console.log(firstSudent.newYear())
console.log(secondSudent.addScore(3))
console.log(secondSudent.enrollStudents, Student.enrollStudents)