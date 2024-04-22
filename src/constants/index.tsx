export const ANSWERS = [
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

export const QUESTIONS_LIST = [
  {
    id: 1,
    question: 'Top cloud costs by services in production account (#24542)',
    isCurrent: true,
  },
  {
    id: 2,
    question: 'Which application cost are increasing the fastest?',
    isCurrent: false,
  },
  {
    id: 3,
    question:
      'How much money are we losing by not moving to graviton instances?',
    isCurrent: false,
  },
  {
    id: 4,
    question: 'Which are the largest s3 buckets by size?',
    isCurrent: false,
  },
]

export const OPTIONS = {
  pieHole: 0.8,
  is3D: false,
  pieSliceTextStyle: {
    color: 'black',
  },
}

export const DATA_STORES = [
  ['DB', 'amount'],
  ['Others ($10,000)', 1],
  ['Elasticache ($10,000)', 1],
  ['Opensearch ($10,000)', 1],
  ['S3 ($20,000)', 2],
  ['RDS ($20,000)', 2],
  ['EC2 ($30,000)', 3],
]

export const COST_EXPENSE_DATA = [
  ['From', 'To', 'Weight'],
  ['Excess Costs: 2,500', 'Production: 2,000', 22],
  ['Excess Costs: 2,500', 'Staging: 300', 4],
  ['Excess Costs: 2,500', 'Analytics: 200', 2],

  ['Staging: 300', '', 4],
  ['Analytics: 200', '', 2],

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

export const COSTS_EXPENSE_CHART_OPTIONS = {
  width: 900,
  sankey: {
    node: { nodePadding: 20 },
  },
}

export const FIRST_QUESTION =
  'Top cloud costs by services in production account(#24542)'

export const START_TYPING = 'Start typing your query here...'
export const LOADING_SQL = 'Generating SQL Query...'
export const COMPILE_LOAD = 'Compiling data...'
export const RETRIEVING = 'Retrieving Data...'
export const FIRST_QUESTION_ANSWER_DESCRIPTION = `
You production account (#24542) has accumulated costs of
$100,000 over the past month, here is spread of cloud
costs of services;
`
export const FEEDBACK_LINE = 'Have the answers been satisfactory so far?'
export const SECOND_QUESTION = 'How can I reduce my EC2 costs?'

export const SECOND_QUESTION_DESCRIPTION = (
  <>
    <p>
      You can save $2500 per month overall in EC2 costs.{' '}
      <a className='text-green-500 underline' href='/'>
        Click here
      </a>{' '}
      to access a detailed report.
    </p>
    <p>Here are your top 2 savings area:</p>{' '}
  </>
)

export const THIRD_QUESTION = 'Why are EC2 costs increasing so much?'

export const THIRD_QUESTION_DESCRIPTION = `
  You production account (#24542) has accumulated costs of
  $100,000 over the past month, here is spread of cloud costs
  of services;
`
