import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, Key } from "lucide-react";
import { useAdminPasswords } from "@/store";

export const Route = createFileRoute("/admin/passwords")({ component: PasswordsAdmin });

function PasswordsAdmin() {
  const { passwords, add, update, remove } = useAdminPasswords();
  const [form, setForm] = useState({ value: "", label: "", notes: "", maxUses: "" });

  return (
    <div className="p-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="eyebrow">Private access</div>
          <h1 className="font-serif text-4xl mt-2">Password Management</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-lg">Access keys unlock the Private Collection. Passwords are stored locally in this demo — connect Lovable Cloud to persist across devices.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6 mb-6">
        <div className="font-serif text-xl mb-4">Create new access key</div>
        <div className="grid gap-3 md:grid-cols-5">
          <input placeholder="Password" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} className="border border-border rounded-full px-4 py-2.5 text-sm" />
          <input placeholder="Label (e.g. VIP)" value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} className="border border-border rounded-full px-4 py-2.5 text-sm" />
          <input placeholder="Max uses (optional)" type="number" value={form.maxUses} onChange={e => setForm({ ...form, maxUses: e.target.value })} className="border border-border rounded-full px-4 py-2.5 text-sm" />
          <input placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="border border-border rounded-full px-4 py-2.5 text-sm md:col-span-1" />
          <button
            onClick={() => {
              if (!form.value || !form.label) return;
              add({ value: form.value, label: form.label, notes: form.notes, maxUses: form.maxUses ? Number(form.maxUses) : undefined });
              setForm({ value: "", label: "", notes: "", maxUses: "" });
            }}
            className="bg-charcoal text-warm rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.22em] flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" /> Create
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <tr>
              {["Key", "Label", "Uses", "Max", "Enabled", "Notes", ""].map(h => (
                <th key={h} className="text-left px-6 py-3 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {passwords.map(p => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-6 py-4 font-mono text-xs flex items-center gap-2"><Key className="h-3.5 w-3.5 text-gold" /> {p.value}</td>
                <td className="px-6 py-4">{p.label}</td>
                <td className="px-6 py-4">{p.uses}</td>
                <td className="px-6 py-4">{p.maxUses ?? "—"}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => update(p.id, { enabled: !p.enabled })}
                    className={`text-xs px-3 py-1 rounded-full ${p.enabled ? "bg-green-100 text-green-800" : "bg-secondary text-muted-foreground"}`}
                  >
                    {p.enabled ? "Active" : "Disabled"}
                  </button>
                </td>
                <td className="px-6 py-4 text-xs text-muted-foreground">{p.notes ?? "—"}</td>
                <td className="px-6 py-4">
                  <button onClick={() => remove(p.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
