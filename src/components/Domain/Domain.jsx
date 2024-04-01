import React, { useEffect, useRef, useState } from 'react';
import './Domain.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DELETE, GET, POST } from '../../api/axios';
import { Tooltip } from 'react-tooltip';
import UpdateRecord from './UpdateRecord';
import { toast } from 'react-toastify';
import DomainTile from './DomainTile';

const Domain = () => {
  const [domainDetails, setDomainDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddDomain, setOpenAddDomain] = useState(false);
  const navigation = useNavigate();
  const params = useParams();

  const submitRecord = async items => {
    try {
      setLoading(true);
      const response = await POST(`/domain/add-domain-records`, {
        ...items,
        domain: params.name,
        zoneId: params.id,
      });
      const data = response.data;
      console.log(data);

      setDomainDetails(data?.record?.recordCollection?.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDomainsDetails = async () => {
    try {
      setLoading(true);
      const response = await GET(
        `/domain/get-domain-records/${params.name}/${params.id}`,
      );
      const data = response.data;
      console.log(data);
      toast.success('Record fetched successfully');
      setDomainDetails(data?.records?.recordCollection?.items);
    } catch (error) {
      toast.error('An error occurred');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDomainRecord = async (recordHash, rtype) => {
    try {
      setLoading(true);
      const response = await POST(`/domain/delete-domain-records`, {
        recordHash,
        domain: params.name,
        zoneId: params.id,
        rtype: rtype,
      });
      const data = response.data;
      console.log(data);
      toast.success('Record deleted successfully');
      fetchDomainsDetails();
      // setDomainDetails(data?.record?.recordCollection?.items);
    } catch (error) {
      toast.error('An error occurred');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDomainsDetails();
  }, []);

  return (
    <div className="domain_container_component">
      <div className="domain_container_component_header">
        <span>Domain Records</span>
        <button onClick={() => navigation('/create-domain')}>Add Domain</button>
      </div>

      <div className="domain_container_component_description">
        <p>
          Manage your domain records seamlessly! When adding or updating records
          like A or CNAME, ensure NS records are updated with your registrar. NS
          records direct internet traffic to your domain's DNS servers, ensuring
          smooth functionality. Don't overlook this crucial step for accurate
          and efficient domain resolution. Simplify your management process
          today!
        </p>
      </div>
      <div className="domain_container_component_content">
        <div className="domain_container_component_content_grid domain_container_component_content_grid_header">
          <div className="domain_container_component_content_grid_header_item">
            Record Type
          </div>
          <div className="domain_container_component_content_grid_header_item">
            Record Value
          </div>
          <div className="domain_container_component_content_grid_header_item">
            TTL
          </div>
          <div className="domain_container_component_content_grid_header_item">
            Action
          </div>
        </div>
        <div className="domain_container_component_content_grid_section">
          {domainDetails?.map(domain => {
            return (
              <DomainTile
                domain={domain}
                key={domain.recordHash}
                zoneId={params.id}
                deleteDomainRecord={deleteDomainRecord}
                fetchDomainsDetails={fetchDomainsDetails}
              />
            );
          })}
          {!openAddDomain && <UpdateRecord submitHandle={submitRecord} />}
        </div>
      </div>
    </div>
  );
};

export default Domain;
