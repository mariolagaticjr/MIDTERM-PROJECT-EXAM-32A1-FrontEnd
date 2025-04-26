function OutputContainer(props) {
    return (
        <div>
            <h3>ID Number : {props.ID}</h3>
            <h3>Student Name : {props.name}</h3>
            <h3>Student Subjects : {props.Subjects}</h3>
            <h3>Student Sections : {props.Sections}</h3>
        </div>
    );
}

export default OutputContainer;