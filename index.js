//RASTER by itsgalo
//gif capture tool

let tkData;

async function fetchProject() {
  const response = await fetch('https://gateway-arbitrum.network.thegraph.com/api/7287862b47084102dc545bdcb84b3b20/subgraphs/id/6bR1oVsRUUs6czNiB6W7NNenTXtVfNd5iSiwvS4QbRPB', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
          query {
            project(id:"0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270-341"){
                tokens (first: 400){
                  tokenId
                  hash
                }
              }
            }
        `,
      variables: {
        now: new Date().toISOString(),
      },
    }),
  })
  
  if (!response.ok) {
	throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const projectData = await response.json();
  return projectData;
}

function msg(message) {
  document.getElementById("lnk").innerText = message;
  document.getElementById("lnk").href="raster.html?hash=" + message;
}

function getHash(id) {
  let hash = tkData.data.project.tokens[id].hash;
  msg(hash);
  return hash;
}

fetchProject().then(pd => {
  //console.log(pd);
  tkData = pd;
  //msg(pd.data.project.tokens[0].hash);
  let ids = "<option selected disabled>invocation #</option>";
  for (let i = 0; i < tkData.data.project.tokens.length; i++) {
      ids += "<option>" + i + "</option>";
  }
  document.getElementById("tk").innerHTML = ids;
});