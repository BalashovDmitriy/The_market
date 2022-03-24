import React from "react";
import { Link as NavLink } from "react-router-dom";

function Promo({Pagination, PaginationItem, pageQty, page, setPage}) {
  return (
    <section className="Promo">
      <h2 className="Promo__title">ADS-ONLINE</h2>
      <p className="Promo__subtitle">Лучшая платформа для продажи вещей</p>
      <div className="border">
        <Pagination
          count={pageQty}
          page={page}
          onChange={(_, num) => setPage(num)}
          showFirstButton
          showLastButton
          sx={{ marginY: 3, marginX: "auto", color: "white" }}
          renderItem={(item) => (
            <PaginationItem
              component={NavLink}
              to={`/?page=${item.page}`}
              {...item}
            />
          )}
        />
      </div>
    </section>
  );
}

export default Promo;
