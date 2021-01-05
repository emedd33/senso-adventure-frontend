import React from "react";
import TodoForm from "../components/Todo/TodoForm";
import TodoList from "../components/Todo/TodoList";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { FunctionComponent } from "react";

type TodoProps = {}
const TodoPage: FunctionComponent<TodoProps> = () => {

    return (
        <div style={{ width: "100%", height: "100%", backgroundColor: "white", paddingTop: "10rem" }}>
            <Container className="conatiner" maxWidth="sm">
                <Card>
                    <CardContent>
                        <h3>Simple TODO App</h3>
                        <TodoForm />
                        <TodoList />
                    </CardContent>
                </Card>
            </Container>
        </div >
    )


}

export default TodoPage