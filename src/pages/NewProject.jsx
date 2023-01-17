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
      </button>
    </div>
  );
}

//list node component
function ListNode(props) {
  return (
    <div className="list-node">
      <input
        className="input-list-node"
        type="text"
        placeholder="New Node"
        onChange={props.handleNodeChange}
      />
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
      listName: "New List",
      listNodes: [],
      completed: [],
      listNodeInfo: {},
      completedNodesInfo: [],
    };
  }

  listNodeKey = 0;
  completedNodesKey = 0;

  //adds a new node key to the list
  addNodes = () => {
    this.setState({
      listNodes: this.state.listNodes.concat(this.listNodeKey++),
    });
  };

  //updates the list name
  changeListName = (event) => {
    this.setState({ listName: event.target.value });
  };

  //remove nodes from list
  onDelete = (key) => {
    const newList = this.state.listNodes;
    //remove from listNodes
    for (let i = 0; i < newList.length; i++) {
      if (newList[i] === key) {
        newList.splice(i, 1);
      }
    }
    this.setState({ listNodes: newList });
  };

  //move nodes to completed
  onComplete = (key) => {
    const newList = this.state.listNodes;
    //add to completed nodes
    this.setState({
      completedNodesInfo: this.state.completedNodesInfo.concat(
        this.state.listNodeInfo[key]
      ),
      completed: this.state.completed.concat(this.completedNodesKey++),
    });
    //remove from listNodes
    for (let i = 0; i < newList.length; i++) {
      if (newList[i] === key) {
        newList.splice(i, 1);
      }
    }
    this.setState({ listNodes: newList });
  };

  //when nodes input is updated
  onChange = (key, event) => {
    const list = this.state.listNodeInfo;
    list[key] = event.target.value;
    this.setState({
      listNodeInfo: list,
    });
  };

  render() {
    return (
      <div className="list">
        <div className="list-header">
          <input
            className="input-list-title"
            type="text"
            placeholder="New List"
            onChange={this.changeListName}
          />
        </div>
        <div className="list-body">
          {this.state.listNodes.map((listNode) => {
            return (
              <ListNode
                key={listNode}
                onComplete={() => this.onComplete(listNode)}
                onDelete={() => this.onDelete(listNode)}
                handleNodeChange={(e) => this.onChange(listNode, e)}
                backgroundColor={"red"}
              />
            );
          })}
          <button className="add-listnode" onClick={this.addNodes}>
            Add Node
          </button>
        </div>
        <div className="completed">
          <h3>Completed</h3>
          {this.state.completed.map((completedNodesInfo) => {
            return (
              <p className="complete" key={completedNodesInfo}>
                {this.state.completedNodesInfo[completedNodesInfo]}
              </p>
            );
          })}
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
    console.log(this.state.title);
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
