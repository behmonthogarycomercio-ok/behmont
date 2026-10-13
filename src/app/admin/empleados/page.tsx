import AdminShell from '@/components/admin/AdminShell';
import DepositoStaffSecrets from '@/components/admin/DepositoStaffSecrets';
import CobradorStaffSecrets from '@/components/admin/CobradorStaffSecrets';
import { DEPOSITO_STAFF, canIngreso, canGestionZonas, canVenderPreventa } from '@/lib/deposito';
import { COBRADORES } from '@/lib/preventas';

// Roles derivados de los mismos flags que ya usa el resto del sitio para
// decidir qué puede hacer cada PIN -- así esta lista nunca queda
// desactualizada respecto al comportamiento real de /deposito y /ventas.
function rolesDeposito(pin: (typeof DEPOSITO_STAFF)[number]['pin']): string[] {
  const roles = ['Depósito'];
  if (canIngreso(pin)) roles.push('Ingreso de stock');
  if (canGestionZonas(pin)) roles.push('Gestión de zonas y fotos');
  if (canVenderPreventa(pin)) roles.push('Vendedor');
  if (pin === 1) roles.push('Supervisor de cobradores');
  return roles;
}

export default function EmpleadosPage() {
  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-bold text-steel-950 mb-2">Empleados</h1>
      <p className="text-sm text-steel-500 mb-6">
        Quién es quién, qué puede hacer cada uno, y dónde se define/resetea su código secreto
        para entrar a <span className="font-mono">/deposito</span> y <span className="font-mono">/ventas</span>.
        Los códigos se guardan hasheados -- una vez definidos no se pueden volver a ver, solo resetear.
      </p>

      <div className="rounded-xl2 border border-plate-200 bg-white shadow-card p-5 mb-8">
        <h2 className="font-display text-lg font-bold text-steel-950 mb-3">
          Depósito / vendedores ({DEPOSITO_STAFF.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-steel-400 border-b border-plate-200">
                <th className="py-2 pr-4">PIN</th>
                <th className="py-2 pr-4">Nombre</th>
                <th className="py-2">Rol</th>
              </tr>
            </thead>
            <tbody>
              {DEPOSITO_STAFF.map((s) => (
                <tr key={s.pin} className="border-b border-plate-100 last:border-0">
                  <td className="py-2 pr-4 font-mono text-steel-500">{s.pin}</td>
                  <td className="py-2 pr-4 font-medium text-steel-900">{s.name}</td>
                  <td className="py-2 text-steel-600">{rolesDeposito(s.pin).join(' · ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl2 border border-plate-200 bg-white shadow-card p-5 mb-8">
        <h2 className="font-display text-lg font-bold text-steel-950 mb-3">
          Cobradores ({COBRADORES.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-steel-400 border-b border-plate-200">
                <th className="py-2 pr-4">PIN</th>
                <th className="py-2 pr-4">Nombre</th>
                <th className="py-2">Ciudad</th>
              </tr>
            </thead>
            <tbody>
              {COBRADORES.map((c) => (
                <tr key={c.pin} className="border-b border-plate-100 last:border-0">
                  <td className="py-2 pr-4 font-mono text-steel-500">{c.pin}</td>
                  <td className="py-2 pr-4 font-medium text-steel-900">{c.name}</td>
                  <td className="py-2 text-steel-600">{c.ciudad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DepositoStaffSecrets />
      <CobradorStaffSecrets />
    </AdminShell>
  );
}
