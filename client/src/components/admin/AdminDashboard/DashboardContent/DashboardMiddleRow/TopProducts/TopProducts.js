import React from "react";

const TopProducts = () => {
  return (
    <div className="TopProducts">
      <div className="TopProducts__header">Top Products</div>
      <table className="TopProducts__table">
        <tbody>
          <tr className="TopProducts__table__tr">
            <th className="TopProducts__table__th">IPhone X</th>
            <td className="TopProducts__table__td">2245</td>
          </tr>
          <tr className="TopProducts__table__tr">
            <th className="TopProducts__table__th">One Plus</th>
            <td className="TopProducts__table__td">2245</td>
          </tr>
          <tr className="TopProducts__table__tr">
            <th className="TopProducts__table__th">IPhone X</th>
            <td className="TopProducts__table__td">2245</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TopProducts;
