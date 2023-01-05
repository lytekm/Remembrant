import React from "react";

//input component for title
function TitleInput(props) {
  //title change function is a method of NewProject class so it has access to state of NewProject
  return (
    <input
      className="input-title"
      type="text"
      placeholder="New Project"
      onChange={props.handleTitleChange}
    />
  );
}

//button to add a new list
function AddList(props) {
  return (
    <div className="add-list">
      {/*add list function is a method of NewProject class so it has access to state of NewProject*/}
      <button onClick={props.handleAddListClick}>
        <p>Add List</p>
        <img src="plussign.png" />
      </button>
    </div>
  );
}

//list node component
function ListNode(props) {
  return (
    <div className="list-node">
      <input className="input-list-node" type="text" placeholder="New Node" />
      <button className="list-node-button" onClick={props.onComplete}>
        Complete
      </button>
      <button className="list-node-button" onClick={props.onDelete}>
        Delete
      </button>
    </div>
  );
}

//list component
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listNodes: [],
      completedNodes: [],
    };
  }

  listNodeKey = 0;

  addNodes = () => {
    this.setState({
      listNodes: this.state.listNodes.concat(this.listNodeKey++),
    });
  };

  onComplete = (key) => {
    //add to completedNodes
    const newList = this.state.listNodes;
    const completedNode = newList.filter((listNode) => listNode === key);
    this.setState({
      completedNodes: this.state.completedNodes.concat(completedNode),
    });
    console.log(this.state.completedNodes);

    //remove from listNodes
    for (let i = 0; i < newList.length; i++) {
      if (newList[i] === key) {
        newList.splice(i, 1);
      }
    }
    this.setState({ listNodes: newList });
  };

  render() {
    return (
      <div className="list">
        <div className="list-header">
          <input
            className="input-list-title"
            type="text"
            placeholder="New List"
          />
          <button className="addlistnode" onClick={this.addNodes}>
            Add Node
          </button>
        </div>
        <div className="list-body">
          {this.state.listNodes.map((listNode) => {
            return (
              <ListNode
                key={listNode}
                onComplete={() => this.onComplete(listNode)}
              />
            );
          })}
        </div>
        <div className="completed">
          <p>Completed</p>
        </div>
      </div>
    );
  }
}

export default class NewProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "New Project",
      lists: [],
    };
  }

  listKey = 0;

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  handleAddListClick = () => {
    this.setState({
      lists: this.state.lists.concat(this.listKey++),
    });
  };

  render() {
    return (
      <div className="new-project-screen">
        <div className="new-project-header">
          <TitleInput handleTitleChange={this.handleTitleChange} />
        </div>
        <div className="new-project-body">
          <div className="add-list">
            <AddList handleAddListClick={this.handleAddListClick} />
          </div>
          <div className="lists">
            {this.state.lists.map((list) => {
              return <List key={list} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}
