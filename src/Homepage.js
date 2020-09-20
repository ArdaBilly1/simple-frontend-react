import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';

class Homepage extends Component{

    render(){
        return (
            <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-header'>Pilih Jenis Framework Rest-api</div>
                  <div className='card-body'>
                    <div className="row">
                        <div className="col-md-6">
                      <Link
                        className='btn btn-secondary'
                        to={`/lumen`}
                        >Lumen
                      </Link>
                        </div>
                        <div className="col-md-6">
                      <Link
                        className='btn btn-secondary'
                        to={`/lara`}
                        >Laravel
                      </Link>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
       }
}
export default Homepage