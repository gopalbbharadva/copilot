export const Answers = [
  {
    firsLine: (
      <p className='text-sm font-bold text-start'>
        Bucket xyz-logs-1 (production account #12345)
      </p>
    ),
    secondLine: (
      <p className='text-sm text-start'>
        This bucket has <b>1TB</b> of data, nad it does not use any storage
        tiers.There is more than <b>500GB</b> of data that has not been
        accessed. You can save <b>$1000</b> by deleting that data or <b>$700</b>
        by moving them to lower tier.
      </p>
    ),
  },
  {
    firsLine: (
      <p className='text-sm font-bold text-start'>
        Bucket abc-user-1 (production account #12345)
      </p>
    ),
    secondLine: (
      <p className='text-sm text-start'>
        This bucket has abnormally high reads and write cost of <b>$5000</b> per
        month, increasing by the day. Consider reading smaller chunks of data or
        changing your storage that is more cost effective for reads and writes`
      </p>
    ),
  },
]

export const questions = [
  'Top cloud costs by services in production account (#24542)',
  'Which application cost are increasing the fastest?',
  'How much money are we losing by not moving to graviton instances?',
  'Which are the largest s3 buckets by size?',
]

export const tasks = [
  ['Task', 'Hours per Day'],
  ['Work', 11],
  ['Eat', 2],
  ['Commute', 2],
  ['Watch TV', 2],
  ['Sleep', 7],
]

export const costExpenseData = [
  ['From', 'To', 'Weight'],
  ['Excess Costs: 2,500', 'Production: 2,000', 22],
  // ['Excess Costs: 2,500', 'Staging: 300', 4],
  // ['Excess Costs: 2,500', 'Analytics: 200', 2],

  // ['Staging: 300', '', 4],
  // ['Analytics: 200', '',2],

  ['Production: 2,000', 'Purpose: 800', 9],
  ['Production: 2,000', 'Customers: 600', 8],
  ['Production: 2,000', 'Product: 600', 8],

  ['Purpose: 800', 'Web App: 700', 6],
  ['Purpose: 800', 'API: 240', 2],
  ['Purpose: 800', 'Workflow: 160', 1],

  ['Customers: 600', 'Amex: 420', 5],
  ['Customers: 600', 'City: 180', 3],

  ['Product: 600', 'Web App: 700', 4],
  ['Product: 600', 'Mobile App: 180', 2],
  ['Product: 600', 'Chat: 120', 2],
]

export const costExpenseChartOptions = {
  // explorer: {
  //   actions: ['dragToZoom', 'rightClickToReset'],
  //   axis: 'horizontal',
  //   keepInBounds: true,
  //   maxZoomIn: 4.0,
  // },
  width: 900,
  sankey: { node: { nodePadding: 20 } },
}
