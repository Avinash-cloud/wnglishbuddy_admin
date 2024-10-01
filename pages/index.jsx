import Layout from "../components/Layout";
import { Line, Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
export default function Home() {
  const revenueData = {
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Total Revenue',
        data: [30, 40, 35, 50, 45, 60, 70, 60, 55, 65, 70, 80],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
      {
        label: 'Total Sales',
        data: [20, 30, 25, 40, 35, 50, 60, 55, 50, 60, 65, 75],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const profitData = {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [
      {
        label: 'Sales',
        data: [40, 60, 55, 70, 50, 80, 85],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Revenue',
        data: [20, 30, 25, 40, 20, 50, 45],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };
  return (
    <Layout>
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Cards */}
          {[
            { label: 'Total Views', value: '$3.456K', percentage: '0.43%', isPositive: true },
            { label: 'Total Profit', value: '$45.2K', percentage: '4.35%', isPositive: true },
            { label: 'Total Product', value: '2,450', percentage: '2.59%', isPositive: true },
            { label: 'Total Users', value: '3.456', percentage: '0.95%', isPositive: false },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{item.value}</h2>
                <p className="text-gray-500">{item.label}</p>
              </div>
              <div className={`text-sm ${item.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {item.isPositive ? '↑' : '↓'} {item.percentage}
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {/* Line Chart for Revenue */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Total Revenue and Sales</h3>
            <Line data={revenueData} />
          </div>

          {/* Bar Chart for Profit */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Profit this week</h3>
            <Bar data={profitData} />
          </div>
        </div>
      </div>

    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const token = req.cookies['next-auth.session-token'] || req.cookies['__Secure-next-auth.session-token']; // Also check for the secure cookie in production

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false, // Temporary redirect
      },
    };
  }

  return {
    props: {}, // Pass props to your page component if needed
  };
}
