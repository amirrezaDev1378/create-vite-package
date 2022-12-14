const project = ({projectName}) => {
    return [
        {
            file: "src/App.tsx",
            content: `import React from 'react';
import vitePackage from '${projectName}';
console.log(vitePackage);
         const App = () => {
             return (
                    <div>
                        <h1>Hello World from ${projectName}</h1>
                    </div>
                )
         }  
            export default App;
            
            
            
            `
        }
    ]
}
export default project;
