import { useState } from "react";

type Node = {
    name: string;
    folders?: Node[];
  }
  const filesConfigData = [
    { name: "C drive",
    folders:[
      {
        name:"Home",
        folders:[
          {
            name: "Music"
          },
          {
            name: "Games",
            folders:[
              {name: "GTA1"},
              {name: "GTA2"},
              {name: "GTA3"},
              {name: "GTA4"},
              {name: "GTA5"},
            ]
          }
        ]
      }
  
    ]
  
  },
  
  {
    name: "D drive"
  },
  {name: "Resume.pdf"}
  ]
  const FileSystemUsingRecursion = () => {
  
  
    return (
      <>
        
        <ul className="files-container px-16">
          {filesConfigData.map((node, index) => 
          <li key={index} className="node mb-2">
            <FileSystem node={node} />
          </li>
          )}
        </ul>
      </>
    )
  }
  
  const FileSystem: React.FC<{node: Node}> =({node})=>{
    const [isOpen, setIsOpen] = useState(false);
    return(
      <>
      <button onClick={()=> {if(node?.folders) {setIsOpen(!isOpen)} }}>
      {
        node?.folders && <span>{!isOpen? ">" : "#"}</span>
      }
      {node?.name}
        </button>
     
      {isOpen && node?.folders && 
      node.folders.map((nestedNode, index) => {
        return (
          <li className="node pl-5" key={index}>
          <FileSystem node={nestedNode} />
          </li>
        )
      }
    )}
    </>
    )
  }
  
  export default FileSystemUsingRecursion;