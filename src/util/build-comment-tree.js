function getComment(id) {

}



//Takes array of children (i.e. the top level comments of the post)
export function buildCommentTree(item) {
  let tree = {}

  children.forEach(item => {
    let response = getComment(item);
    tree.push(response)
    if (response.children.size() > 0) {

    }
  })

  return tree;
}

function buildTree(story) {

  return story;
}

function propagateChildren(item) {
  item = getComment(item)
  for (let i = 0; i < item.children.length-1; i++) {
    item.children[i] = getComment(item.children[i])
    if(item.children[i].children.length > 0) {
      for(let child in item.children[i].children) {
        propagateChildren(item.children[i])
      }

    }
  }
  return item;
}
