export default {
  getImage: async () => {
    try{
      const res = await fetch('https://pixabay.com/api/?key=8408114-01528f89601439f4cd5f6f8af&category=animals')
      const json = res.json()
      return json
    } catch(err) {
      console.log(err)
    }
  }
}