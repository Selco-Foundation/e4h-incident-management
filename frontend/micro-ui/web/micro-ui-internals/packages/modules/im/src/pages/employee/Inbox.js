import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader, Header } from "@egovernments/digit-ui-react-components";

import DesktopInbox from "../../components/DesktopInbox";
import MobileInbox from "../../components/MobileInbox";
import { Link } from "react-router-dom";

const Inbox = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { uuid } = Digit.UserService.getUser().info;
  const [pageOffset, setPageOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchParams, setSearchParams] = useState({ filters: { wfFilters: { assignee: [{ code: uuid }] } }, search: "", sort: {} });

  useEffect(() => {
    (async () => {
      const applicationStatus = searchParams?.filters?.pgrfilters?.applicationStatus?.map(e => e.code).join(",")
      let response = await Digit.PGRService.count(tenantId, applicationStatus?.length > 0  ? {applicationStatus} : {} );
      if (response?.count) {
        setTotalRecords(response.count);
      }
    })();
  }, [searchParams]);

  const fetchNextPage = () => {
    setPageOffset((prevState) => prevState + 10);
  };

  const fetchPrevPage = () => {
    setPageOffset((prevState) => prevState - 10);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  const handleFilterChange = (filterParam) => {
    setSearchParams({ ...searchParams, filters: filterParam });
  };

  const onSearch = (params = "") => {
    console.log("paramsparams",params,searchParams)
    setSearchParams({ ...searchParams, search: params });
  };

  // let complaints = Digit.Hooks.pgr.useInboxData(searchParams) || [];
  console.log("searchParamssearchParams",searchParams)
  let tenant=""
  if(searchParams?.search?.phcType)
  {
    tenant = searchParams?.search?.phcType
  }
  console.log("tenant",tenant)
  let { data: complaints, isLoading } = Digit.Hooks.pgr.useInboxData({ ...searchParams,offset: pageOffset, limit: pageSize }) ;
  console.log("complai", complaints)

  let isMobile = Digit.Utils.browser.isMobile();

  if (complaints?.length !== null) {
    if (isMobile) {
      return (
        <MobileInbox data={complaints} isLoading={isLoading} onFilterChange={handleFilterChange} onSearch={onSearch} searchParams={searchParams} />
      );
    } else {
      return (
        <div>
          <Header>{t("ES_COMMON_INBOX")}</Header>
          <div style={{color:"#9e1b32", marginBottom:'10px'}}>
    <Link to={`/digit-ui/employee`}>{t("BACK")}</Link></div> 
          <DesktopInbox
            data={complaints}
            isLoading={isLoading}
            onFilterChange={handleFilterChange}
            onSearch={onSearch}
            searchParams={searchParams}
            onNextPage={fetchNextPage}
            onPrevPage={fetchPrevPage}
            onPageSizeChange={handlePageSizeChange}
            currentPage={Math.floor(pageOffset / pageSize)}
            totalRecords={totalRecords}
            pageSizeLimit={pageSize}
          />
        </div>
      );
    }
  } else {
    return <Loader />;
  }
};

export default Inbox;
