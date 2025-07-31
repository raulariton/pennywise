const Navbar = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <div className="flex flex-1 justify-between items-center py-6 px-3">
      <div className="flex flex-col">
        <h1 className="font-semibold text-xl font-eudoxus-sans">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
};

export default Navbar;
