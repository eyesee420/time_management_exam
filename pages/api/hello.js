// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req, res) {

  connectMongo()
console.log("test");
  res.status(200).json({ name: 'eyeseee ' })
}
