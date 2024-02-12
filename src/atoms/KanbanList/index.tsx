


const KanbanList = ({ title, children }: any) => {
  return (
    <>
      <div>
        <div>{title}</div>
        {children}
      </div>
    </>
  );
};

export default KanbanList;
