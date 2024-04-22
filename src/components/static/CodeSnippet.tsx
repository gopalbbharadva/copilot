export const CodeSnippet = () => {
  return (
    <div
      className={
        'w-full flex justify-start items-start bg-gray-700 text-white rounded-lg p-4'
      }
    >
      <iframe
        src='https://carbon.now.sh/embed?bg=rgba%2855%2C65%2C81%2C1%29&t=seti&wt=none&l=sql&width=680&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=56px&ph=56px&ln=true&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=SELECT%250A%2509service%252C%250A%2520%2520%2520%2520SUM%28cost%29%2520AS%2520total_cost%250AFROM%250A%2509cloud_costs%250AWHERE%250A%2509account_type%253D%27production%2520%28%252324542%29%27%250AGROUP%2520BY%250A%2509service%250AORDER%2520BY%250A%2509total_cost%2520DESC%253B'
        style={{
          width: '100%',
          height: '391px',
          border: 0,
          overflow: 'hidden',
        }}
        sandbox='allow-scripts allow-same-origin'
      ></iframe>
    </div>
  )
}
