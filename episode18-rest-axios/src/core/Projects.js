class Projects {

    constructor(howMany = 0) {
        this.projectArray = [{
            key: '1',
            name: 'Project A',
            description: 'jada di'
        }, {
            key: '2',
            name: 'Project B',
            description: 'jada da'
        }, {
            key: '3',
            name: 'Project C',
            description: 'jada dum'
        }].splice(0, howMany);
    }
}

export default Projects;
