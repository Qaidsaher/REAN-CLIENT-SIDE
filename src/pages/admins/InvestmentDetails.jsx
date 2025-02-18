import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInvestmentById, updateInvestment } from '../../services/admins/investmentService';
import AdminLayout from '../../layouts/AdminLayout';
import { FaMoneyBillWave, FaUserTie, FaLightbulb, FaCalendarAlt, FaHandshake, FaFileContract, FaSyncAlt, FaImage, FaEnvelope, FaPhoneAlt, FaCity, FaInfoCircle, FaCheckCircle, FaTimesCircle, FaTag, FaClipboardList } from 'react-icons/fa';
import Notification from '../../components/UI/Notification';
const InvestmentDetails = () => {
    const { id } = useParams();
    const [investment, setInvestment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [updating, setUpdating] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });
    useEffect(() => {
        const fetchInvestment = async () => {
            try {
                const data = await getInvestmentById(id);
                setInvestment(data);
                setStatus(data.commitment?.status);
            } catch (error) {
                setNotification({ message: 'Failed to fetch investment details:', type: 'error' });

                console.error('Failed to fetch investment details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchInvestment();
    }, [id]);

    const handleStatusChange = async () => {
        setUpdating(true);
        try {
            await updateInvestment(id, { 'status': status });
            setNotification({ message: 'Status updated successfully', type: 'success' });
        } catch (error) {
            setNotification({ message: 'Failed to update status', type: 'error' });
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="text-center mt-6">Loading investment details...</div>;
    if (!investment) return <div className="text-center mt-6 text-red-600">Investment not found</div>;

    return (
        <AdminLayout selectedNav="investments">
            <Notification message={notification.message} messageType={notification.type} onClose={() => setNotification({ message: '', type: '' })} />

            <div className="p-6 max-w-7xl mx-auto bg-white shadow-md rounded-lg border border-indigo-300">
                <h2 className="text-4xl font-bold mb-6 text-indigo-700">Investment Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Investor Info */}
                    <div className="bg-indigo-100 p-4 rounded-lg shadow-md">
                        <div className="flex items-center gap-4">
                            <img src={investment.investor?.photo || '/default-avatar.png'} alt="Investor" className="w-20 h-20 rounded-full border" />
                            <div>
                                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                    <FaUserTie className="text-blue-600" /> Investor
                                </h3>
                                <div className="px-6">
                                    <p><FaInfoCircle className="inline text-gray-600 mr-2" /> <strong>Name:</strong> {investment.investor?.firstName} {investment.investor?.lastName}</p>
                                    <p><FaEnvelope className="inline text-red-600 mr-2" /> <strong>Email:</strong> {investment.investor?.email}</p>
                                    <p><FaCity className="inline text-green-600 mr-2" /> <strong>City:</strong> {investment.investor?.city}</p>
                                    <p><FaPhoneAlt className="inline text-blue-500 mr-2" /> <strong>Phone:</strong> {investment.investor?.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Innovator Info */}
                    <div className="bg-green-100 p-4 rounded-lg shadow-md">
                        <div className="flex items-center gap-4">
                            <img src={investment.innovator?.photo || '/default-avatar.png'} alt="Innovator" className="w-20 h-20 rounded-full border" />
                            <div>
                                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                    <FaLightbulb className="text-yellow-600" /> Innovator
                                </h3>
                                <div className="px-6">
                                    <p><FaInfoCircle className="inline text-gray-600 mr-2" /> <strong>Name:</strong> {investment.innovator?.firstName} {investment.innovation?.createdBy?.lastName}</p>
                                    <p><FaEnvelope className="inline text-red-600 mr-2" /> <strong>Email:</strong> {investment.innovator?.email}</p>
                                    <p><FaCity className="inline text-green-600 mr-2" /> <strong>City:</strong> {investment.innovator?.city}</p>
                                    <p><FaPhoneAlt className="inline text-blue-500 mr-2" /> <strong>Phone:</strong> {investment.innovator?.phone}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Innovation Info */}
                    <div className="bg-purple-100 p-4 rounded-lg shadow-md col-span-2">
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <FaLightbulb className="text-indigo-600" /> Innovation Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <img src={investment.innovation?.image || '/default-innovation.png'} alt="Innovation" className="w-60 h-60 rounded border shadow-lg" />
                            <div>
                                <p className="text-lg"><FaTag className="inline text-green-500 mr-2" /> <strong>Name:</strong> {investment.innovation?.name}</p>
                                <p className="text-lg"><FaMoneyBillWave className="inline text-green-600 mr-2" /> <strong>Cost:</strong> ${investment.innovation?.cost}</p>
                                <p className="text-lg"><FaClipboardList className="inline text-blue-600 mr-2" /> <strong>Category:</strong> {investment.innovation?.category?.name || 'N/A'}</p>
                                <p className="text-lg"><FaInfoCircle className="inline text-blue-600 mr-2" /> <strong>Status:</strong> {investment.innovation?.status}</p>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-lg"><FaInfoCircle className="inline text-purple-600 mr-2 text-2xl" /> <strong className='text-xl'>Description:</strong>
                                <div className="px-4">
                                    {investment.innovation?.description}
                                </div>
                            </p>
                            <p className="text-lg"><FaInfoCircle className="inline text-teal-600 mr-2 text-2xl " /> <strong className='text-xl'>Details:</strong>
                                <div className="px-4">
                                    {investment.innovation?.details}
                                </div>
                            </p>
                        </div>

                    </div>

                    {/* Commitment Info */}
                    <div className="bg-pink-100 p-4 rounded-lg shadow-md col-span-2">
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                            <FaHandshake className="text-pink-600" /> Commitment
                        </h3>
                        <p><FaInfoCircle className="inline text-gray-600 mr-2" /> <strong>Conditions:</strong> {investment.commitment?.conditions}</p>
                        <p><FaCheckCircle className={`inline mr-2 ${investment.commitment?.investorSign ? 'text-green-600' : 'text-red-600'}`} /> <strong>Investor Signed:</strong> {investment.commitment?.investorSign ? 'Yes' : 'No'}</p>
                        <p><FaCheckCircle className={`inline mr-2 ${investment.commitment?.innovatorSign ? 'text-green-600' : 'text-red-600'}`} /> <strong>Innovator Signed:</strong> {investment.commitment?.innovatorSign ? 'Yes' : 'No'}</p>
                        <p><FaInfoCircle className="inline text-gray-600 mr-2" /> <strong>Status:</strong> {investment.commitment?.status}</p>
                        <div className='p-4'><strong>Milestones:</strong>
                            <ul className="list-none ml-4">
                                {investment.commitment?.milestones.map((milestone, index) => (
                                    <li key={index}><FaInfoCircle className="inline text-purple-500 mr-2" /> {milestone}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Status Update with Radio Buttons */}
                <div className="mt-6">
                    <label className="block text-lg font-semibold mb-4">Update Investment Status</label>
                    <div className="flex gap-6">
                        {['Active', 'Pending', 'Cancelled'].map((value) => (
                            <label key={value} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value={value}
                                    checked={status === value}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="hidden"
                                />
                                <div className={`w-6 h-6 rounded-full border-1 ${status === value ? (value === 'Active' ? 'bg-green-600 border-green-600' : value === 'Pending' ? 'bg-yellow-500 border-yellow-500' : 'bg-red-600 border-red-600') : 'bg-white border-indigo-600'} transition-all duration-300`}></div>
                                <span className={`text-lg font-medium ${value === 'Active' ? 'text-green-600' : value === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>{value}</span>
                            </label>
                        ))}
                    </div>


                    <button
                        onClick={handleStatusChange}
                        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-all"
                        disabled={updating}
                    >
                        <FaSyncAlt className={`${updating ? 'animate-spin' : ''}`} /> {updating ? 'Updating...' : 'Update Status'}
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default InvestmentDetails;
