'use client';

import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { v4 as uuidv4 } from "uuid";



export default function MembershipTracker() {
  const [memberships, setMemberships] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    issueDate: "",
    endDate: "",
    price: "",
    id: ""
  });

  useEffect(() => {
  fetch('/api/memberships')
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch memberships');
      return res.json();
    })
    .then(data => setMemberships(data))
    .catch(console.error);
}, []);

const addMembership = async () => {
  if (!formData.name || !formData.issueDate || !formData.endDate || !formData.price) return;
  try {
    const payload = { ...formData, id: formData.id || uuidv4() };
    const res = await fetch('/api/memberships', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to add membership');
    const newMember = await res.json();
    setMemberships(prev => [...prev, newMember]);
    setFormData({ name: "", issueDate: "", endDate: "", price: "", id: "" });
  } catch (error) {
    console.error(error);
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const filteredMemberships = memberships.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) || m.id.includes(search)
  );

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Membership Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
        <Input name="issueDate" type="date" value={formData.issueDate} onChange={handleInputChange} />
        <Input name="endDate" type="date" value={formData.endDate} onChange={handleInputChange} />
        <Input name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} />
        <Input name="id" placeholder="Scan Barcode / ID (Optional)" value={formData.id} onChange={handleInputChange} />
        <Button onClick={addMembership}>Add Membership</Button>
      </div>

      <Input
        className="mb-4"
        placeholder="Search by name or ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Issue Date</th>
              <th className="p-2">End Date</th>
              <th className="p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredMemberships.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="p-2">{m.id}</td>
                <td className="p-2">{m.name}</td>
                <td className="p-2">{m.issueDate.slice(0, 10)}</td>
                <td className="p-2">{m.endDate.slice(0, 10)}</td>
                <td className="p-2">${m.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
