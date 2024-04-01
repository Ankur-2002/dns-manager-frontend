import React, { useEffect, useState } from 'react';
import './Home.css';
import { GET } from '../../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';

const Home = () => {
  const [domains, setDomains] = useState([]);
  const navigation = useNavigate();
  const fetchDomains = async () => {
    try {
      const response = await GET('/domain/get-domains');
      const data = await response.data;
      console.log(data);
      setDomains(data?.domains?.items);
    } catch (error) {
      toast.error('An error occurred');
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDomains();
  }, []);
  return (
    <div className="home_container_component">
      <div className="home_container_component_header">
        <span>Domains </span>
        <button
          onClick={() => {
            navigation('/create-domain');
          }}
        >
          Add Domain
        </button>
      </div>

      <div className="home_container_component_content">
        <div className="home_container_component_content_grid home_container_component_content_grid_header">
          <div className="home_container_component_content_grid_header_item">
            Id
          </div>
          <div className="home_container_component_content_grid_header_item">
            Name
          </div>
          <div className="home_container_component_content_grid_header_item">
            Zone Type
          </div>
          <div className="home_container_component_content_grid_header_item">
            Created At
          </div>
          <div className="home_container_component_content_grid_header_item">
            Action
          </div>
        </div>
        <div className=" home_container_component_content_grid_section ">
          {domains.map(domain => {
            return (
              <div
                className="home_container_component_content_grid_container"
                key={domain.id}
              >
                <div
                  className="home_container_component_content_grid_container_item"
                  data-tooltip-content={domain.id}
                  data-tooltip-id={domain.id}
                >
                  <Tooltip id={domain.id} />
                  {domain.id}
                </div>
                <div
                  className="home_container_component_content_grid_container_item"
                  data-tooltip-content={domain.name}
                  data-tooltip-id={domain.name}
                >
                  <Tooltip id={domain.name} />
                  {domain.name}
                </div>
                <div
                  className="home_container_component_content_grid_container_item"
                  data-tooltip-content={domain.zoneType}
                  data-tooltip-id={domain.zoneType}
                >
                  <Tooltip id={domain.zoneType} />
                  {domain.zoneType}
                </div>
                <div
                  className="home_container_component_content_grid_container_item"
                  data-tooltip-content={moment(domain.timeCreated).format(
                    'MMMM Do YYYY, h:mm:ss a',
                  )}
                  data-tooltip-id={domain.timeCreated}
                >
                  <Tooltip id={domain.timeCreated} />
                  {moment(domain.timeCreated).format('MMMM Do YYYY, h:mm:ss a')}
                </div>
                <div className="home_container_component_content_grid_container_item">
                  <button
                    onClick={() => {
                      navigation(`/domain/${domain.name}/${domain.id}`);
                    }}
                  >
                    Check
                  </button>
                  <button>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
